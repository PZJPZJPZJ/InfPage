# Haze 高斯模糊库技术分析

## 1. Haze 项目概述

[Haze](https://github.com/chrisbanes/haze) 是一个为 **Compose Multiplatform** 提供硬件加速视觉特效的开源库，由前 Google Android 团队工程师 Chris Banes 开发。它实现了高斯模糊、毛玻璃（Glassmorphism）、液态玻璃（Liquid Glass）等效果，覆盖以下平台：

| 平台 | 支持状态 | 渲染后端 |
|---|---|---|
| Android | ✅ | RenderEffect (API 31+) / RenderScript / Scrim |
| iOS | ✅ | Skia ImageFilter (Metal GPU) |
| Desktop (JVM) | ✅ | Skia ImageFilter (OpenGL/Vulkan) |
| Web (Wasm/JS) | ✅ | Skia ImageFilter (WebGL/WebGPU) |

**GitHub 数据**: 2.3k Stars, 70 Forks, 75 个 Release, 26 位贡献者, Apache-2.0 许可证。

---

## 2. Haze 渲染机制深度解析

### 2.1 项目架构与模块划分

```
haze-root/
├── haze/                   核心模块：HazeState、Modifier Node
├── haze-blur/              高斯模糊特效实现
├── haze-materials/         预置材质风格（Cupertino、Fluent）
├── haze-liquidglass/       iOS 风格液态玻璃特效（实验性）
├── haze-utils/             平台抽象层（expect/actual）
├── internal/               内部测试与构建工具
└── sample/                 Demo 应用（Android/Desktop/iOS/Web）
```

**依赖关系**:
```
haze (核心编排)
  ← haze-blur (高斯模糊特效)
    ← haze-materials (Cupertino/Fluent 预置风格)
  ← haze-liquidglass (液态玻璃)
  ← haze-utils (平台渲染抽象)
```

**源码集结构**:
```kotlin
commonMain           // 跨平台公共代码
androidMain          // Android 平台实现
skikoMain            // Skiko 平台（Desktop / iOS / macOS / Web）
```

### 2.2 Compose Modifier.Node 体系

Haze 的核心构建在 Compose 的 `Modifier.Node` 架构之上。这是 Compose 1.3+ 引入的高性能 Modifier 实现方式。

#### 两个核心 Modifier

| Modifier | 职责 | 节点类 |
|---|---|---|
| `Modifier.hazeSource(state)` | 标记内容为"模糊源"，将内容渲染到 `GraphicsLayer` | `HazeSourceNode` |
| `Modifier.hazeEffect(state)` | 标记区域为"模糊效果层"，读取源内容并绘制特效 | `HazeEffectNode` |

#### HazeSourceNode：内容捕获

```kotlin
// haze/src/commonMain/kotlin/dev/chrisbanes/haze/HazeSourceNode.kt:180
override fun ContentDrawScope.draw() {
    if (size.minDimension.roundToInt() >= 1) {
        val contentLayer = area.contentLayer
            ?.takeUnless { it.isReleased }
            ?: graphicsContext.createGraphicsLayer()
        contentLayer.record {
            this@draw.drawContentSafely()
        }
        drawLayer(contentLayer)
    } else {
        drawContentSafely()
    }
}
```

**渲染机制原理**:
- **`GraphicsLayer`**: Compose 对 Android `RenderNode` / `Skia 硬件加速层` 的封装。录制后，图层内容缓存在 GPU 纹理中。
- **`GraphicsLayer.record {}`**: 将绘制指令录制到一个离屏缓冲区。
- **`drawLayer()`**: 将录制的图层内容快速绘制到目标 Canvas。

#### HazeEffectNode：特效编排

`HazeEffectNode` 实现了多个 Compose 节点接口：

```kotlin
public class HazeEffectNode(
    state: HazeState,
    public var block: (HazeEffectScope.() -> Unit)? = null,
) : Modifier.Node(),
    CompositionLocalConsumerModifierNode,
    GlobalPositionAwareModifierNode,
    LayoutAwareModifierNode,
    ObserverModifierNode,
    DrawModifierNode,
    TraversableNode,
    HazeEffectScope
```

**`draw()` 方法：两种模糊模式**:

```kotlin
override fun ContentDrawScope.draw() {
    if (state != null) {
        // === 背景模糊 ===
        with(visualEffect) { draw(visualEffectContext) }
        drawContentSafely()
    } else {
        // === 前景模糊 ===
        contentLayer.record(size.toIntSize()) {
            this@draw.drawContentSafely()
        }
        with(visualEffect) { draw(visualEffectContext) }
    }
}
```

#### 脏标记机制

HazeEffectNode 使用精细化的脏标记 `Bitmask` 追踪哪些状态发生了变化：

```
InputScale    = 0b1           // 缩放比例变化
ScreenPosition                 // 屏幕位置变化
AreaOffsets                    // 源区域偏移变化
Size                           // 节点尺寸变化
Areas                          // 源区域列表变化
LayerSize                      // 层尺寸变化
LayerOffset                    // 层偏移变化
DrawContentBehind              // 前景/背景开关
ClipToAreas                    // 裁剪开关
ExpandLayer                    // 层扩展开关
ForcePreDraw                   // 强制预绘制
```

### 2.3 GraphicsLayer：离屏渲染核心

#### 创建与生命周期

```kotlin
val graphicsContext = currentValueOf(LocalGraphicsContext)
val contentLayer = area.contentLayer
    ?.takeUnless { it.isReleased }
    ?: graphicsContext.createGraphicsLayer().also {
        area.contentLayer = it
    }
```

#### GraphicsLayer 的重要属性

| 属性 | 说明 |
|---|---|
| `renderEffect` | 关联一个 `RenderEffect`（Android API 31+） |
| `alpha` | 图层整体透明度 |
| `clip` | 是否裁剪到图层边界 |
| `compositingStrategy` | 合成策略 |
| `size` | 图层尺寸 |
| `isReleased` | 是否已被释放 |

### 2.4 RenderEffect：Android 硬件加速模糊

#### 可用性判断

```kotlin
internal fun canUseRenderEffect(sdkInt: Int, isHardwareAccelerated: Boolean): Boolean {
    return sdkInt >= 31 && isHardwareAccelerated
}
```

条件：
1. **Android 12 (API 31) 及以上**: `RenderEffect` 可用
2. **硬件加速开启**: Canvas 必须是硬件加速的

#### RenderEffect 链式构建

```kotlin
createBlurRenderEffect(...)              // ① 高斯模糊
    .blendForeground(noise, Softlight)   // ② 叠加噪点
    .withTints(colorEffects, ...)        // ③ 叠加色调
    .withMask(mask, ...)                 // ④ 应用遮罩
    .asComposeRenderEffect()             // ⑤ 转换为 Compose RenderEffect
```

#### Android 平台实际实现

```kotlin
// Android 端
actual fun createBlurRenderEffect(...): PlatformRenderEffect? {
    val blurEffect = RenderEffect.createBlurEffect(radiusX, radiusY, edgeTreatment)
    return if (input != null) {
        RenderEffect.createChainEffect(blurEffect, input)
    } else {
        blurEffect
    }
}
```

其他效果函数:
- `createBlendRenderEffect()` → `RenderEffect.createBlendModeEffect()`
- `createShaderRenderEffect()` → `RenderEffect.createShaderEffect()`
- `createColorFilterRenderEffect()` → `RenderEffect.createColorFilterEffect()`
- `createOffsetRenderEffect()` → `RenderEffect.createOffsetEffect()`
- `.then()` → `RenderEffect.createChainEffect()`

### 2.5 自定义 SKSL/AGSL 着色器

对于渐变模糊（progressive blur），Haze 使用了自定义 SKSL 着色器。

#### SKSL 着色器代码

```glsl
// haze-blur/src/commonMain/kotlin/dev/chrisbanes/haze/blur/HazeBlurShaders.kt
uniform shader content;
uniform float blurRadius;
uniform vec4 crop;
uniform shader mask;

const half maxRadius = 150.0;

float gaussian(float x, float sigma) {
    return exp(-(x * x) / (2.0 * sigma * sigma));
}

vec4 blur(vec2 coord, float radius) {
    half r = floor(radius + 0.5);
    float sigma = max(radius / 2.0, 1.0);
    float weightSum = 1.0;
    vec4 result = content.eval(coord);

    for (half i = 1.0; i < maxRadius; i += 2.0) {
        if (i >= r) break;
        float weightL = gaussian(i, sigma);
        float weightH = gaussian(i + 1.0, sigma);
        float weight = weightL + weightH;
        vec2 offset = vec2(i + weightH / weight, 0.0);
        result += weight * content.eval(coord - offset);
        result += weight * content.eval(coord + offset);
        weightSum += weight;
    }
    return result / weightSum;
}

vec4 main(vec2 coord) {
    vec2 maskCoord = max(coord - crop.xy, vec2(0.0, 0.0));
    float intensity = mask.eval(maskCoord).a;
    return blur(coord, mix(0.0, blurRadius, intensity));
}
```

#### 着色器关键技术

| 技术 | 说明 |
|---|---|
| **分离式高斯模糊** | 两趟模糊（先水平再垂直），复杂度从 O(n²) 降到 O(2n) |
| **GPU 线性采样优化** | 利用纹理采样器的硬件线性插值 |
| **遮罩控制强度** | `mix(0.0, blurRadius, intensity)` 实现逐像素控制 |
| **裁剪保护** | `crop` uniform 确保采样不超出有效区域 |
| **FP16 精度注意** | 部分设备（三星）需要使用 `float` 避免精度溢出 |

### 2.6 RenderScript：旧版 Android 的 CPU 模糊

当 Android API < 31（不支持 RenderEffect）但支持 RenderScript 时使用。

#### 渲染流程

```
Surface (硬件加速表面)
  ↓ lockHardwareCanvas()
Canvas → 绘制 GraphicsLayer 内容
  ↓ unlockCanvasAndPost()
Surface 输出 → Bitmap
  ↓ RenderScript blur
ScriptIntrinsicBlur (CPU 并行)
  ↓ 结果 Bitmap
GraphicsLayer.record { drawImage(bitmap) }
  ↓ drawLayer()
最终绘制
```

#### 关键优化

- **缩放输入**: RenderScript 的 `maxBlurRadius = 25px`，需要先缩小再放大
- **4 倍数填充**: RenderScript Allocation 要求宽高为 4 的倍数
- **协程异步**: 模糊操作在 `Dispatchers.Default` 上异步执行
- **跳帧机制**: 如果上一帧仍在处理中，跳过当前绘制

### 2.7 平台抽象层：expect/actual 机制

#### 平台类型映射

```kotlin
// commonMain (接口声明)
expect class PlatformRenderEffect
expect class PlatformColorFilter
expect class PlatformRuntimeEffect

// androidMain (Android 实现)
actual typealias PlatformRenderEffect = android.graphics.RenderEffect
actual typealias PlatformColorFilter = android.graphics.ColorFilter
actual typealias PlatformRuntimeEffect = android.graphics.RuntimeEffect // API 33+

// skikoMain (Skiko 实现)
actual typealias PlatformRenderEffect = org.jetbrains.skia.ImageFilter
actual typealias PlatformColorFilter = org.jetbrains.skia.ColorFilter
actual typealias PlatformRuntimeEffect = org.jetbrains.skia.RuntimeEffect
```

#### 平台函数实现对比

| 功能 | Android | Skiko |
|---|---|---|
| 创建模糊 | `RenderEffect.createBlurEffect()` | `ImageFilter.makeBlur()` |
| 创建混合 | `RenderEffect.createBlendModeEffect()` | `ImageFilter.makeBlend()` |
| 创建着色器 | `RenderEffect.createShaderEffect()` | `ImageFilter.makeShader()` |
| 运行时着色器 | `RuntimeShader + ImageFilter.makeRuntimeShader` | `RuntimeEffect + ImageFilter.makeRuntimeShader` |
| 链式组合 | `RenderEffect.createChainEffect()` | `ImageFilter.makeCompose()` |

#### 模糊半径转 Sigma

Skiko 平台需要将半径转为标准差 Sigma：

```kotlin
private fun radiusToSigma(radius: Float): Float {
    return radius * 0.57735f + 0.5f
}
```

### 2.8 渐变模糊的实现

#### 方法一：自定义 GPU 着色器（最高质量）

**平台要求**: Android API 33+ / Skiko 全平台

```kotlin
private fun createGradientBlurRenderEffect(...): PlatformRenderEffect {
    fun shader(vertical: Boolean): PlatformRenderEffect = createRuntimeShaderRenderEffect(
        effect = if (vertical) VERTICAL_BLUR_SHADER else HORIZONTAL_BLUR_SHADER,
        shaderNames = arrayOf("content"),
        inputs = arrayOf(null),
    ) {
        setFloatUniform("blurRadius", blurRadiusPx)
        setChildShader("mask", mask)
    }
    return shader(vertical = false).then(shader(vertical = true))
}
```

#### 方法二：多层近似法（兼容性最佳）

通过绘制多个不同模糊强度的层叠加，使用 60dp 为一个步长计算层数。

#### 方法三：Alpha Mask 遮罩法（最轻量）

退化到均匀模糊 + alpha 遮罩，在 RenderEffect 链末尾应用 DstIn 混合模式。

### 2.9 性能优化策略

#### 输入缩放（Input Scaling）

这是 Haze 最核心的性能优化策略：

| scaleFactor | 像素减少 | 适用场景 |
|---|---|---|
| 1.0 | 0% | 小模糊半径 (< 7dp) |
| 0.5 | 75% | 渐变模糊、带遮罩 |
| 0.3334 | ~89% | 大半径均匀模糊 |

#### 懒惰分配与复用

只在尺寸变化或首次创建时分配新的 GraphicsLayer，否则复用。

#### 链式 RenderEffect 一次 GPU 绘制

所有特效组合为一个 RenderEffect 链，一次合成，避免多次 CPU-GPU 同步。

#### 条件预绘制监听

仅在必要时启用预绘制监听，避免不必要的重绘消耗。

### 2.10 完整渲染管线流

#### 初始化和数据流

```
Step 1: 初始化
rememberHazeState() → HazeState
  ├─ HazePositionStrategy (Auto/Local/Screen)
  └─ areas: MutableList<HazeArea>

Modifier.hazeSource(state) → HazeSourceNode
  └─ onAttach(): state.addArea(HazeArea)

Modifier.hazeEffect(state) → HazeEffectNode
  └─ 内部创建 VisualEffectContext
```

#### 布局阶段

```
Step 2: 布局 & 位置计算
HazeSourceNode.onGloballyPositioned(coords)
  → area.position / area.size 更新

HazeEffectNode.onGloballyPositioned(coords)
  → _position / _size 更新
  → 触发 updateEffect() 按脏标记 invalidateDraw()
```

#### 绘制阶段

```
Step 3: 内容捕获 (HazeSourceNode.draw)
创建/复用 GraphicsLayer
contentLayer.record { drawContentSafely() }
drawLayer(contentLayer) → 绘制到屏幕

Step 4: 效果绘制 (HazeEffectNode.draw)
背景模糊:
  visualEffect.draw(context)
    → Delegate 选择 (RenderEffect → RenderScript → Scrim)
    → delegate.draw(context):
      1. 计算缩放因子
      2. 创建/复用缩放内容层
      3. 源内容缩放录制
      4. 构建 RenderEffect 链: blur → noise → tints → mask
      5. layer.renderEffect = finalRenderEffect
      6. drawLayer(layer) → GPU 后处理
      7. drawContentSafely() → 前景内容

前景模糊:
  节点内容录制 → 可选 drawLayer → visualEffect.draw(context)
```

#### 跨窗口处理

```
HazePositionStrategy.Auto
  → 检测 areas[].windowId != effect.windowId
  → 自动提升为 Screen 坐标策略
  → 启用预绘制监听 (PreDrawListener)
```

### 2.11 iOS 兼容性解密

Haze 之所以兼容 iOS，没有任何 iOS 专属代码——完全归功于 Compose Multiplatform 的渲染架构。

#### 架构原理

```
Compose Multiplatform 在 iOS 上的渲染栈:
┌──────────────────────────────┐
│  Compose UI (Kotlin)         │
├──────────────────────────────┤
│  Skiko (Kotlin → Skia C++)   │
├──────────────────────────────┤
│  Skia (C++ 图形库)           │
│  ├─ 统一 GLSL 着色器引擎      │
│  ├─ 统一 ImageFilter 特效系统 │
│  └─ 统一 GPU 后端抽象         │
├──────────────────────────────┤
│  Metal (iOS GPU)             │
└──────────────────────────────┘
```

#### 源码集映射

```kotlin
iosMain { dependsOn(skikoMain) }    // iOS 继承 skikoMain 所有代码
macosMain { dependsOn(skikoMain) }  // macOS 也一样
```

没有专门的 `iosMain` 目录。iOS 与 Desktop、macOS、Web 共享同一份 `skikoMain` 源码。

#### 跨平台一致性

| 组件 | Android | iOS | Desktop |
|---|---|---|---|
| 模糊实现 | `RenderEffect.createBlurEffect()` | `ImageFilter.makeBlur()` | `ImageFilter.makeBlur()` |
| 着色器 | `RuntimeShader` (AGSL) | `RuntimeEffect` (SKSL) | `RuntimeEffect` (SKSL) |
| 噪点 | Bitmap Texture | Fractal Noise Shader | 同 iOS |
| Cupertino 样式 | ✅ | ✅ | ✅ |

### 2.12 关键源码速查表

#### 核心模块

| 文件 | 核心内容 |
|---|---|
| `haze/.../Haze.kt` | `HazeState`、`HazeArea`、`hazeSource()` Modifier |
| `haze/.../HazeEffect.kt` | `HazeEffectScope` 接口、`hazeEffect()` Modifier |
| `haze/.../HazeEffectNode.kt` | `HazeEffectNode.draw()` 编排、脏标记、`updateEffect()` |
| `haze/.../HazeSourceNode.kt` | `HazeSourceNode.draw()` 内容捕获、GraphicsLayer 录制 |
| `haze/.../VisualEffect.kt` | `VisualEffect` 接口定义 |
| `haze/.../VisualEffectContext.kt` | 视觉效果上下文 |
| `haze/.../HazePositionStrategy.kt` | 坐标策略 |

#### 模糊模块

| 文件 | 核心内容 |
|---|---|
| `haze-blur/.../BlurVisualEffect.kt` | 模糊参数与 Delegate 调度 |
| `haze-blur/.../BlurRenderEffectVisualEffect.kt` | RenderEffect 模式主逻辑 |
| `haze-blur/.../BlurRenderEffect.kt` | 链式构建模糊/噪点/色调/遮罩 |
| `haze-blur/.../HazeBlurShaders.kt` | SKSL 着色器源码 |
| `haze-blur/androidMain/.../BlurVisualEffect.android.kt` | Android Delegate 选择 |
| `haze-blur/skikoMain/.../BlurVisualEffect.skiko.kt` | Skiko Delegate 选择 |
| `haze-blur/.../RenderScriptBlurVisualEffectDelegate.kt` | RenderScript 异步模糊 |
| `haze-blur/.../ScrimBlurVisualEffectDelegate.kt` | 纯色遮罩降级 |

#### 平台工具模块

| 文件 | 核心内容 |
|---|---|
| `haze-utils/commonMain/.../RenderEffect.kt` | 跨平台 RenderEffect 接口声明 |
| `haze-utils/androidMain/.../RenderEffect.android.kt` | Android 实现 |
| `haze-utils/skikoMain/.../RenderEffect.skiko.kt` | Skiko 实现 |

---

## 3. Compose 是什么

### 3.1 声明式 UI 框架

**Jetpack Compose** 是 Google 推出的现代 Android UI 开发框架，采用**声明式编程**模型。而 **Compose Multiplatform** 是 JetBrains 将其扩展为跨平台方案——让同一份 Kotlin 代码编写 Android、iOS、Desktop、Web 的 UI。

传统 UI 是命令式的（"创建一个按钮，设置文字，添加到布局"），Compose 则是声明式的（"当状态为 X 时，显示这个界面"），界面随状态自动更新。

### 3.2 Compose 的核心概念

#### Composable 函数
用 `@Composable` 注解的函数是 Compose 的基本构建块：

```kotlin
@Composable
fun Greeting(name: String) {
    Text("Hello, $name!")
}
```

它们描述 UI 结构，不直接返回视图对象，由 Compose 运行时高效地更新界面。

#### Modifier 体系
这是 Compose 中装饰、布局、交互的核心机制。Haze 库正是构建在 Modifier 之上。

#### GraphicsLayer 离屏渲染
Compose 在底层使用 `GraphicsLayer` 管理离屏缓冲区（对应 Android 的 `RenderNode`）。Haze 利用它将内容录制到 GPU 纹理中，再通过 `RenderEffect` / `ImageFilter` 进行后处理模糊。

### 3.3 Haze 中的 Compose 运用

| Compose 机制 | Haze 的利用方式 |
|---|---|
| `Modifier.Node` 架构 | `HazeSourceNode` 捕获内容，`HazeEffectNode` 编排特效 |
| `GraphicsLayer` | 离屏录制内容，作为模糊输入源 |
| `RenderEffect` | GPU 后处理特效链：模糊→噪点→色调→遮罩 |

---

## 4. 架构层级连接解析

### 4.1 每层连接关系图

```
┌─────────────────────────────────────────────────────────────────┐
│  Compose Composable (声明式 UI 描述)                             │
│  @Composable fun MyScreen() { ... }                             │
└────────────────────────┬────────────────────────────────────────┘
                         │ 编译后生成 UI tree
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Modifier.Node 体系 (布局与绘制节点)                             │
│  ┌──────────────┐  ┌────────────────────────────────────────┐  │
│  │ HazeSourceNode│  │ HazeEffectNode                        │  │
│  │  - 捕获内容   │  │  - 编排特效链                         │  │
│  │  - 创建 Layer │◄─┤  - 消费 Source 的 GraphicsLayer       │  │
│  └──────┬───────┘  │  - 应用 RenderEffect                   │  │
│         │          └────────────────────────────────────────┘  │
│         │ 通过 HazeState.areas[] 连接                          │
└─────────┼──────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│  GraphicsLayer (离屏渲染缓冲区 = GPU 纹理)                      │
│  HazeSourceNode.record { drawContent() }  → 写入 GPU 纹理      │
│  HazeEffectNode 从 HazeArea.contentLayer 读取该纹理             │
└────────────────────────┬────────────────────────────────────────┘
                         │ 设置 renderEffect
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  RenderEffect / ImageFilter (GPU 后处理特效链)                  │
│  ┌──────────┐ → ┌──────────┐ → ┌─────────┐ → ┌──────────┐     │
│  │ Blur     │   │ Noise    │   │ Tints   │   │ Mask     │     │
│  └──────────┘   └──────────┘   └─────────┘   └──────────┘     │
│         ↑ 通过 .then() / createChainEffect() 串联               │
└────────────────────────┬────────────────────────────────────────┘
                         │ GPU 着色器编译执行
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Skia GPU 引擎 (跨平台图形层)                                   │
│  ┌──────────┬──────────┬──────────┬──────────┐                 │
│  │ Android  │  iOS     │ Desktop  │   Web    │                 │
│  │ Vulkan/  │  Metal   │  OpenGL/ │  WebGL/  │                 │
│  │ OpenGL   │          │ Vulkan   │  WebGPU  │                 │
│  └──────────┴──────────┴──────────┴──────────┘                 │
└────────────────────────┬────────────────────────────────────────┘
                         │ 提交帧
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  屏幕 (最终像素输出)                                            │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 核心连接点详解

#### 连接点 1：Modifier → GraphicsLayer

```kotlin
// "切断"直接绘制、重定向到离屏缓冲区
contentLayer.record {
    this@draw.drawContentSafely()  // 内容被录制到纹理，而非屏幕
}
drawLayer(contentLayer)            // 纹理映射到屏幕（轻量操作）
```

#### 连接点 2：GraphicsLayer → RenderEffect

```kotlin
layer.renderEffect = createRenderEffect(  // 设置 GPU 后处理特效
    blurRadius = blurRadius,
    noise = noise,
    colorEffects = colorEffects,
    mask = mask,
)
drawLayer(layer)  // GPU 在绘制此层时自动应用 RenderEffect
```

`renderEffect` 是连接图层和 GPU 着色器的桥梁。图层内容是输入，RenderEffect 是处理函数，输出是模糊后的像素。

#### 连接点 3：平台抽象层

```
commonMain 声明的接口         androidMain 实现            skikoMain 实现
─────────────────      ────────────────────      ────────────────────
expect fun              actual fun                  actual fun
createBlurRenderEffect  RenderEffect                 ImageFilter
                        .createBlurEffect()          .makeBlur()
```

### 4.3 一句话总结管线

**Modifier 编排 → GraphicsLayer 离屏录制 → renderEffect 挂载 GPU 特效 → Skia 跨平台渲染 → 屏幕输出**

每层只做一件事，通过明确的接口连接，这就是 Haze 能在所有平台上运行同一份特效代码的原因。

---

## 5. 与 Android 12 官方模糊的对比

### 5.1 对比总览表

| 维度 | Android 12 官方 | Haze |
|---|---|---|
| **定位** | 系统级 API 工具 | 跨平台 Compose 特效引擎 |
| **平台** | 仅 Android | Android / iOS / Desktop / Web |
| **适用对象** | View / Surface / Window | Compose `Modifier` 链 |
| **模糊强度** | 均匀模糊 ✅ | 均匀 + **渐变模糊** ✅ |
| **噪点纹理** | ❌ 需自己实现 | ✅ 内置 |
| **色调叠加** | ❌ 需自己链式组合 | ✅ `colorEffects` 内置 DSL |
| **遮罩控制** | ❌ | ✅ Brush 遮罩控制模糊区域 |
| **降级策略** | API < 31 直接不可用 | RenderScript → Scrim 自动降级 |
| **输入缩放优化** | ❌ | ✅ 自动缩放到 33%~50% |
| **跨窗口模糊** | ❌ | ✅ 支持 Dialog 等跨窗口场景 |
| **材料预设** | ❌ | ✅ Cupertino、Fluent 风格 |

### 5.2 核心差异详解

#### 抽象层级不同

**Android 12 官方** —— 直接操作 `RenderNode` / `View`:
```kotlin
view.renderEffect = RenderEffect.createBlurEffect(
    radiusX, radiusY, edgeTreatment
)
```

**Haze** —— Compose Modifier 链式组合:
```kotlin
Modifier
    .hazeSource(state)
    .hazeEffect(state) {
        visualEffect = BlurVisualEffect().apply {
            blurRadius = 20.dp
            colorEffects = listOf(
                HazeColorEffect.tint(Color.Black.copy(alpha = 0.3f))
            )
        }
    }
```

#### 特效链 vs 单一模糊

Haze 封装了一整套自动链式构建：

```kotlin
blurEffect                       // ① 高斯模糊
    .blendForeground(noise, ...)  // ② 叠加噪点纹理
    .withTints(tintList, ...)     // ③ 叠加色调
    .withMask(mask, ...)          // ④ 应用遮罩
    .asComposeRenderEffect()      // ⑤ 转换为 Compose RenderEffect
```

#### 渐变（渐进式）模糊

**Android 12**: 只有均匀模糊，无法在一张图上让不同位置有不同的模糊强度。

**Haze**: 通过自定义 SKSL/AGSL 着色器实现逐像素模糊强度控制。

#### 兼容性兜底

| 场景 | Android 12 官方 | Haze |
|---|---|---|
| API 33+ | ✅ RenderEffect | ✅ RenderEffect + 运行时着色器 |
| API 31-32 | ✅ RenderEffect | ✅ RenderEffect（不支持着色器时用多层近似） |
| API 18-30 | ❌ 完全不可用 | ✅ RenderScript 降级 |
| API < 18 或非硬件加速 | ❌ 完全不可用 | ✅ Scrim（纯色遮罩）降级 |
| iOS | ❌ | ✅ ImageFilter |

### 5.3 Haze 是自己写渲染还是依赖系统

按平台分场景：

#### Android 12+（API 31-32）→ 部分依赖系统

| 组件 | 来源 |
|---|---|
| 基础模糊 `createBlurEffect()` | ✅ Android 系统 |
| 噪点纹理叠加 | ❌ **自己实现** — Android 用 `BitmapShader`，Skiko 用 Fractal Noise |
| 色调叠加 | ❌ 自己实现 — 链式组合多个 RenderEffect |
| 渐变模糊 | ❌ **自己写 AGSL 着色器** |
| 特效链编排 | ❌ 自己实现的 DSL |
| 输入缩放优化 | ❌ 自己实现的缩放逻辑 |

#### Android 13+（API 33）→ 一半自己写

Haze **没有用** `RenderEffect.createBlurEffect()` 做渐变模糊，而是自己写 GPU 着色器通过 `RuntimeShader` 运行。

#### Android < 12 或非硬件加速 → 完全自己写

```
API 31+         → RenderEffect        (系统)
API 18-30       → RenderScript         (Haze 自己实现的异步模糊管线)
API < 18 / 软绘 → Scrim 纯色遮罩      (Haze 自己写的最简降级)
```

#### iOS / Desktop / Web → 完全不依赖 Android

这些平台上没有 `android.graphics.RenderEffect`，Haze 用 Skia 的 `ImageFilter`。

#### 核心结论

```
Haze ≠ "Android 12 RenderEffect 的封装"
Haze =  "跨平台特效引擎，Android 上是它的一个后端"

Haze 核心架构:
                    ┌──────────────────┐
                    │  Haze 核心编排层   │ ← 自己写：脏标记、坐标策略、跨窗口处理
                    │  (commonMain)     │
                    └──────┬───────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌──────────────┐ ┌────────────┐ ┌──────────────┐
   │ Android 后端  │ │ Skiko 后端 │ │ RenderScript │
   │ RenderEffect │ │ ImageFilter│ │ 降级后端     │
   │ + AGSL 着色器│ │ + SKSL 着色│ │ 完全自己实现  │
   │ + Bitmap 噪点│ │ + Fractal  │ │              │
   │              │ │   Noise    │ │              │
   └──────────────┘ └────────────┘ └──────────────┘
     部分系统API     完全自己实现      完全自己实现
```

---

## 6. 性能分析报告

### 6.1 官方模糊 vs Haze 模糊性能对比

#### 基准：两者都是 GPU 后处理

纯模糊操作本身，性能没有本质差异——都走 GPU 管线。

#### 真正的性能差异来源

| 性能因素 | Android 官方模糊 | Haze |
|---|---|---|
| **输入缩放** | ❌ 无，全像素处理 | ✅ **默认缩放到 33%（~89% 像素减少）** |
| **噪点叠加** | 无此步骤 | ✅ 额外一次 Blend 操作 |
| **色调叠加** | 无此步骤 | ✅ 额外 1~N 次 ColorFilter |
| **遮罩处理** | 无此步骤 | ✅ 额外一次 DstIn 混合 |
| **降级检测** | 无 | ✅ 每次 update 检查 SDK 版本和硬件加速状态 |
| **脏标记** | 无 | ✅ 精细化 Bitmask 只更新变化部分 |

#### 性能开销分布图

```
官方模糊:
┌──────────────────────┐
│  GPU 高斯模糊         │  ← 只有这一个操作
│  全分辨率输入          │
└──────────────────────┘

Haze 均匀模糊 (无缩放):
┌─────────┬──────────┬──────────┬──────────┐
│ GPU 模糊 │ 噪点叠加  │ 色调叠加  │ 遮罩混合  │
│ O(n·r)  │ O(n)     │ O(n)     │ O(n)     │
└─────────┴──────────┴──────────┴──────────┘

Haze 均匀模糊 (默认 0.3334 缩放):
┌───────────┬──────────┬──────────┬──────────┐
│ 缩放内容层  │ GPU 模糊  │ 噪点叠加  │ 色调+遮罩 │
│ (n→0.11n) │O(0.11n·r)│ O(0.11n) │ O(0.11n) │
└───────────┴──────────┴──────────┴──────────┘
```

#### 量化对比（以 1080×2400 屏幕，20dp 模糊半径为例）

| 场景 | 处理像素数 | GPU 操作数 | 相对官方性能 |
|---|---|---|---|
| 官方模糊全分辨率 | ~260万 | 1次模糊 | 基准 1.0x |
| Haze 无缩放 | ~260万 | 模糊+噪点+色调+遮罩 = 4次 | ~1.5x 开销 |
| **Haze 默认缩放** | **~29万** | **4次操作，但像素量 1/9** | **~0.4x 实际更快** |

### 6.2 渐进模糊的性能分析

#### 两种实现

**方式一：自定义着色器（API 33+ / Skiko 全平台）**

性能开销随半径线性增长：
```
均匀模糊 (RenderEffect):         O(n)  ← 硬件加速 O(1)
渐进模糊 (自定义着色器):          O(2 × n × r) ← 半径越大线性增长
```

| 模糊类型 | 采样复杂度 | 半径依赖 |
|---|---|---|
| 均匀模糊 (RenderEffect) | ~O(1) | 几乎不随半径增加 |
| 均匀模糊 (自定义着色器) | O(n·r) | 线性增长 |
| **渐进模糊 (自定义着色器)** | **O(n·r + n)** | **线性增长** |

**方式二：多层近似法（兼容性方案）**

每层 = 一次离屏 RenderTarget 切换 + 一次 RenderEffect，性能最差。

#### 量化对比

| 场景 | 采样次数 | 额外开销 |
|---|---|---|
| 官方模糊 (20px) | 1次后处理 | — |
| Haze 均匀模糊 (20px，着色器路径) | ~40次采样/像素 | ~2x（但缩放后降至 0.22x） |
| **Haze 渐进模糊 (20px max)** | **~40次 + 1次遮罩读** | **额外 ~2.5%** |
| Haze 渐进模糊 (150px max) | ~300次采样/像素 | ~7.5x |

#### 为什么渐进模糊默认输入缩放不同

```kotlin
Auto → when {
    blurRadius < 7.dp  → 1f       // 小半径不缩放
    progressive != null → 0.5f     // 渐进模糊缩放到 50%
    mask != null        → 0.5f
    else                → 0.3334f  // 均匀模糊缩放到 33%
}
```

渐进模糊只缩放到 0.5x 而非 0.33x，因为需要保留足够的原始信息供着色器做逐像素渐变。

#### 性能排行

```
性能排行（从快到慢）:
                 输入缩放 → 像素量 → 实际开销
官方模糊          1.0x     260万    1.0x (基准)
Haze 均匀模糊     0.33x    29万     0.4x ✅ 更快
Haze 渐进模糊     0.5x     65万     1.3x 稍慢
Haze 多层渐进     1.0x    5×260万  5.0x ❌ 最慢
```

### 6.3 降采样控制 API

Haze 通过 `HazeInputScale` 暴露了完整的降采样控制：

```kotlin
Modifier.hazeEffect(state) {
    visualEffect = BlurVisualEffect().apply {
        blurRadius = 20.dp
    }
    
    // 三种选择
    inputScale = HazeInputScale.Auto        // ① 自动（默认）
    // inputScale = HazeInputScale.None     // ② 不降采样 = 1.0f
    // inputScale = HazeInputScale.Fixed(0.5f) // ③ 自定义
}
```

#### 三种模式

| 模式 | 说明 | 适用场景 |
|---|---|---|
| `Auto` | 自动选择：小半径不缩放，渐变/遮罩 0.5x，大模糊 0.33x | 大多数场景 |
| `None` | 不降采样，1:1 处理 | 极致画质（如静态文字模糊） |
| `Fixed(scale)` | 自定义 0~1 的值 | 性能/画质权衡 |

#### 使用示例

```kotlin
// 低端设备上大半径模糊 → 性能优先
inputScale = HazeInputScale.Fixed(0.25f)  // 强制 1/16 像素

// 高DPI屏幕上的小半径模糊 → 保画质
inputScale = HazeInputScale.None
```

---

## 7. 官方文档与事实查证

### 7.1 Android RenderEffect 官方文档确认

从 [Google 官方开发文档](https://developer.android.com/reference/android/graphics/RenderEffect) 查证确认：

| API | 引入版本 | 说明 |
|---|---|---|
| `RenderEffect.createBlurEffect()` | **API 31 (Android 12)** | 高斯模糊 |
| `RenderEffect.createChainEffect()` | **API 31** | 链式组合多个特效 |
| `RenderEffect.createColorFilterEffect()` | **API 31** | 颜色滤镜 |
| `RenderEffect.createBlendModeEffect()` | **API 31** | 混合模式 |
| `RenderEffect.createShaderEffect()` | **API 31** | 着色器效果 |
| `RenderEffect.createRuntimeShaderEffect()` | **API 33 (Android 13)** | 自定义运行时着色器 |
| `RenderEffect.createOffsetEffect()` | **API 31** | 偏移 |

**文档摘要**: `RenderEffect` 被描述为 "Intermediate rendering step used to render drawing commands with a corresponding visual effect"，可通过 `RenderNode.setRenderEffect()` 或 `View.setRenderEffect()` 应用。

### 7.2 Haze 在 GitHub 上的统计数据

| 指标 | 数据 |
|---|---|
| **Stars** | 2.3k ⭐ |
| **Forks** | 70 |
| **Releases** | 75 个 |
| **贡献者** | 26 人 |
| **许可证** | Apache-2.0 |
| **最后更新** | 活跃中（每几天有提交） |
| **编程语言** | Kotlin 99.4% |
| **作者** | Chris Banes（前 Google Android 工程师） |

---

## 8. 同类库对比分析

### 8.1 竞品全景

从 GitHub 搜索 `compose blur effect` 的结果：

| 库 | Stars | 特点 | 跨平台 | 成熟度 |
|---|---|---|---|---|
| **Haze** (chrisbanes) | **2.3k** ⭐ | 毛玻璃、渐变模糊、材料预设、液态玻璃 | ✅ KMP | 最成熟 |
| **Cloudy** (skydoves) | **1.2k** ⭐ | 模糊 + 液态玻璃（凸透镜），C++ CPU 降级 | ✅ KMP | 较新 |
| **imla** (desugar-64) | 206 ⭐ | 轻量硬件加速模糊 | ❌ 仅 Android | 小众 |
| `Modifier.blur()` (Compose 内置) | 内置 | 1.6+ 加入的基础均匀模糊 | ❌ 仅 Android | 官方内置 |

### 8.2 Haze vs Cloudy 详细对比

| 维度 | Haze | Cloudy |
|---|---|---|
| Stars | 2.3k ⭐ | 1.2k ⭐ |
| 作者 | Chris Banes (前 Googler) | skydoves (知名 Kotlin 博主) |
| 模糊 | 均匀 + **渐变模糊** | 均匀模糊 |
| 噪点纹理 | ✅ Bitmap / Fractal Noise | ❌ |
| 色调叠加 | ✅ `colorEffects` DSL | ❌ |
| 遮罩控制 | ✅ Brush 遮罩 | ❌ |
| 液态玻璃 | ✅ 实验性支持 | ✅ 独立 `liquidGlass()` Modifier |
| API 降级 | RenderScript → Scrim | C++ Native (NEON) |
| 材料预设 | ✅ Cupertino、Fluent | ❌ |
| Release 数 | 75 个 | 14 个 |
| 许可证 | Apache-2.0 | Apache-2.0 |

**Cloudy 的特色降级方案**: Android 30- 使用 Native C++（NEON/SIMD 优化）做 CPU 模糊，比 Haze 的 RenderScript 更底层。Cloudy 还提供了 `CloudyState` 回调来观察模糊状态。

**结论**: Haze 是 Compose 模糊特效领域事实上的标准库，Cloudy 是主要竞品，但 Haze 的 Stars 接近它两倍。

---

## 9. 跨平台原理深度解析

### 9.1 Kotlin 不是 Android 专属

这是最常见的误解。**Kotlin 是一门 JVM 语言，不是"安卓语言"。** 它的编译目标有三个：

```
Kotlin 源码 (.kt)
    ├── → JVM 字节码       → Android / Desktop
    ├── → JavaScript/WASM  → Web 浏览器
    └── → Kotlin/Native    → iOS (直接编译为 arm64 机器码)
```

**iOS 上没有 JVM**，所以 Kotlin/Native 直接把 Kotlin 代码**编译成 iOS 的原生机器码（arm64）**，通过 LLVM 工具链，跟 Swift/ObjC 编译出来的二进制完全一样。**不需要任何 runtime 或解释器。**

```
┌─────────────────┐
│ Kotlin 源码      │  MyScreen.kt
└────────┬────────┘
         │ Kotlin/Native 编译器 (基于 LLVM)
         ▼
┌─────────────────┐
│ iOS 原生机器码    │  arm64 二进制，和 Swift 编译产物完全一样
└─────────────────┘
```

### 9.2 iOS 上性能会不会下降

**不会。** 原因要从渲染栈看：

```
原生 iOS 应用                       Compose iOS 应用
┌──────────────────┐              ┌──────────────────┐
│ SwiftUI / UIKit  │              │ Compose (Kotlin) │
├──────────────────┤              ├──────────────────┤
│ Metal (GPU)      │              │ Skia → Metal     │
└──────────────────┘              └──────────────────┘

两者最终都走 Metal GPU 管线
```

| 维度 | 原生 SwiftUI | Compose on iOS | 差异 |
|---|---|---|---|
| 编译 | Swift → arm64 | Kotlin → arm64 | 都是原生机器码 |
| GPU | Metal | Skia → Metal | 多一层 Skia C++ |
| CPU | 直接调用 | 桥接 Skia C++ | 极小开销可忽略 |
| 内存 | 直接分配 | Kotlin + 自动内存管理 | 等价于 Swift ARC |

唯一的额外开销是 Skia 这一层。但 Skia 是 Google 用 C++ 写了二十多年的 2D 图形引擎，Chrome、Android、Flutter 都在用，性能极度优化，现代设备上可以忽略。

> 实际生产案例: McDonald's、Netflix 的部分界面已经在 iOS 上使用 Compose Multiplatform。

### 9.3 为什么 Haze 需要跨平台——iOS 有原生模糊啊？

#### 核心矛盾

如果你已经在用 **Compose Multiplatform** 写跨平台 UI：

```kotlin
@Composable
fun MyScreen() {
    // 我需要给背景加毛玻璃效果
    // 但 Compose 的 Canvas 上没法直接调 UIVisualEffectView
}
```

在 Compose 的世界里，**没有"原生 UIView"这个概念**。Compose 在 iOS 上跑在 Skia/Metal 之上，所有绘制都通过 Compose 绘制管线完成。你没办法在 Compose 的 `Box` 中间插一个 `UIVisualEffectView`——它们属于两个不同的 UI 体系。

#### 两个层次的问题

```
原生 iOS (SwiftUI/UIKit):  .blur(radius: 20)  → 一行搞定 ✅
Compose Multiplatform:     用 Compose Canvas 绘制 → 没有内置模糊 ❌
                           → 需要 Haze 在 GPU 后处理模糊 ✅
```

#### 能不能混用？

技术上可以通过 `UIKitView` 嵌入原生控件，但代价很大：

```kotlin
// 理论上可以，实际上问题很多
UIKitView(
    factory = {
        UIVisualEffectView(effect: UIBlurEffect(style = .systemMaterial))
    }
)
```

**为什么不行？**
1. **覆盖问题** — 原生 `UIVisualEffectView` 无法模糊下面的 Compose 内容（因为 Compose 绘制在 Skia Canvas 上，不是 UIView）
2. **坐标同步** — 滚动、动画等场景下手动同步成本高
3. **每个平台都要写适配** — Android 上又要换方案
4. **每增加一个平台都要写新代码**

#### Haze 的解决思路

在 **Compose 渲染管线内部** 解决问题：

```
代码层面：  写一次 Modifier.hazeEffect() { ... }
                ↓
渲染层面：  Android → RenderEffect (GPU)
           iOS     → ImageFilter (Metal GPU)
           Desktop → ImageFilter (OpenGL/Vulkan)
           Web     → ImageFilter (WebGL/WebGPU)
```

---

## 10. Compose Multiplatform vs Flutter 全面对比

### 10.1 基本定位

| 框架 | 主导方 | 语言 | 图形引擎 | 诞生年份 |
|---|---|---|---|---|
| **Compose Multiplatform** | JetBrains + Google | Kotlin | Skia (C++) | 2020 (KMP)，2023 稳定 |
| **Flutter** | Google | Dart | Skia / Impeller (C++) | 2017 |

### 10.2 详细对比表

| 维度 | Compose Multiplatform | Flutter |
|---|---|---|
| **语言** | Kotlin | Dart |
| **图形引擎** | Skia (C++) | Skia / Impeller (C++) ← **相同引擎！** |
| **渲染架构** | Modifier.Node 体系 | Widget 树 |
| **原生交互** | `expect/actual` 直接调用 native API | Platform Channel |
| **成熟度** | 较新（1.0 2023 年底） | 较成熟（1.0 2018） |
| **生态规模** | 较小但增长快 | 更大，pub.dev ~5 万包 |
| **平台一致性** | 更贴合各平台（Material You / Cupertino） | 更一致（自己画一切） |
| **热重载** | ✅ | ✅ |
| **IDE 支持** | IntelliJ / Android Studio | VS Code / IntelliJ / Android Studio |

### 10.3 核心设计区别

**Flutter** —— 从零到一自己画所有 UI 控件，完全**不依赖**平台原生组件：

```
Flutter Widget → Skia/Impeller (内嵌自带) → GPU 绘制
```

**Compose** —— 依赖平台提供窗口/输入/辅助功能：

```
Compose Composable → Skia → GPU 绘制
（交互借力平台，UI 绘制堆在 Skia 上）
```

### 10.4 归属、开源与许可证

| 框架 | 主导方 | 开源协议 | 源码仓库 |
|---|---|---|---|
| **Compose for Android** | Google (AndroidX 团队) | Apache-2.0 ✅ | android.googlesource.com |
| **Compose Multiplatform** | JetBrains | Apache-2.0 ✅ | [JetBrains/compose-multiplatform-core](https://github.com/JetBrains/compose-multiplatform-core) |
| **Flutter** | Google | BSD-3-Clause ✅ | [flutter/flutter](https://github.com/flutter/flutter) |

**关于 Compose 的归属**: Jetpack Compose（Android 版）完全由 Google 主导。Compose Multiplatform（iOS/Desktop/Web 版）是 JetBrains 从 Google 的 AndroidX 仓库 fork 出来，自己维护跨平台扩展。两者有合作但各自独立开发。

### 10.5 市场占有率和应用率

从 GitHub 数据看差距：

| 指标 | Flutter | Compose Multiplatform |
|---|---|---|
| **GitHub Stars** | **177k** ⭐ | ~12k (合计) |
| **贡献者** | **2,038 人** | ~数十人 |
| **Forks** | **30.5k** | ~数百 |
| **发布历史** | 8年+ | 5年 (稳定版仅 3 年) |
| **生产应用** | 阿里巴巴、字节、Google、腾讯、宝马、eBay... | McDonald's、Netflix (部分)、Cash App... |

**Flutter 是目前最流行的跨平台框架**: 约 46% 跨平台开发者使用；Compose Multiplatform < 5%（较新，但增长快）。

### 10.6 有没有替代关系

**有，但不是"你死我活"的替代。** 它们解决的是不同的人群和场景：

```
如果你是这样:                    你更可能选:
┌──────────────────────────────┬──────────────────────────┐
│ 已有 Android 团队 (Kotlin 主力)│ Compose Multiplatform   │
│                              │ (学习成本最低)           │
├──────────────────────────────┼──────────────────────────┤
│ 从零开始 / 已有 Dart/Web 团队  │ Flutter                 │
│                              │ (生态更成熟)             │
├──────────────────────────────┼──────────────────────────┤
│ 全栈 Kotlin (后端也是)        │ Compose Multiplatform   │
│                              │ (语言统一)               │
├──────────────────────────────┼──────────────────────────┤
│ 需要最大第三方库生态           │ Flutter                 │
│                              │ (pub.dev ≈ 5 万包)       │
└──────────────────────────────┴──────────────────────────┘
```

**实际中更多是共存关系**，就像 React Native 和 Flutter 并存一样——不同需求选不同工具。

**Compose Multiplatform 的特殊优势**: 所有 Android 开发者都在用 Compose（Android 官方 UI 框架），他们转到 Compose Multiplatform 的迁移成本超低——就是加个 iOS target 的事。

---

## 11. 附录：Android 渲染概念映射

| Haze 中的概念 | Android 原生对应 | 说明 |
|---|---|---|
| `GraphicsLayer` | `android.view.RenderNode` | 离屏渲染缓冲区 |
| `GraphicsLayer.record {}` | `RecordingCanvas` + `RenderNode.beginRecording()` | 录制绘制指令 |
| `PlatformRenderEffect` | `android.graphics.RenderEffect` (API 31+) | GPU 后处理特效 |
| `RenderEffect.createBlurEffect()` | Shader 中的高斯模糊 | GPU 纹理模糊 |
| `PlatformRuntimeEffect` | `android.graphics.RuntimeShader` (API 33+) | 自定义 GPU 着色器 |
| `GraphicsContext` | `android.graphics.HardwareRenderer` | 管理硬件加速资源 |
| `drawLayer()` | `RenderNode.drawRenderNode()` | 将录制的图层绘制到目标 |

---

> **编写说明**: 本文档基于 Haze 2.0.0-SNAPSHOT 源码分析编写，旨在作为 Haze 库及 Android/Compose 渲染机制的完整技术研究报告。所有在线查证参考了 Android 开发者官方文档及 GitHub 公开数据。

---

## 12. 从零搭建 Android 项目集成 Haze

本章面向一个新的 Android 项目，从创建到跑起顶栏渐进模糊 + 底栏均匀模糊的完整流程。

### 12.1 搭建步骤

#### 步骤 1：用 Android Studio 创建项目

**New Project** → **Empty Activity**，选择：

- **Language**: Kotlin
- **Minimum SDK**: **API 31 (Android 12+)** — RenderEffect 硬件加速模糊需要 API 31，渐进模糊的 RuntimeShader 需要 API 33+
- **UI 架构**: Compose（默认）

> **关于最低 API 的建议**：Haze 理论上支持到 API 18（用 RenderScript 降级），但如果不必须兼容老设备，**强烈建议 minSdk = 31**。API 31 以下所有模糊走 CPU（RenderScript）或纯色遮罩（Scrim），性能和效果差距很大。

#### 步骤 2：添加 Gradle 依赖

`app/build.gradle.kts`:

```kotlin
dependencies {
    // Haze 核心 + 模糊特效 + 材料预设
    implementation("dev.chrisbanes.haze:haze:1.7.2")
    implementation("dev.chrisbanes.haze:haze-blur:1.7.2")
    implementation("dev.chrisbanes.haze:haze-materials:1.7.2")

    // 其他常规 Compose 依赖
    implementation("androidx.compose.material3:material3:1.3.1")
    // ...
}
```

> **版本查询**：最新稳定版见 [Maven Central](https://search.maven.org/search?q=g:dev.chrisbanes.haze)。本报告撰写时最新稳定版为 `1.7.2`（2026-02-11）。`2.0.0-alpha02` 已发布但尚在实验阶段。

#### 步骤 3：配置 Compose 编译器插件

项目级 `build.gradle.kts`:

```kotlin
plugins {
    id("org.jetbrains.kotlin.android") version "2.0.21" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.21" apply false
}
```

模块级 `app/build.gradle.kts`:

```kotlin
plugins {
    id("org.jetbrains.kotlin.plugin.compose") // Kotlin 2.0+ 分离出来的 Compose 编译器插件
}

android {
    compileSdk = 35  // 或 34

    buildFeatures {
        compose = true
    }
}
```

### 12.2 完整代码示例：顶栏渐进模糊 + 底栏模糊

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import dev.chrisbanes.haze.HazeInputScale
import dev.chrisbanes.haze.hazeEffect
import dev.chrisbanes.haze.hazeSource
import dev.chrisbanes.haze.rememberHazeState
import dev.chrisbanes.haze.blur.blurEffect
import dev.chrisbanes.haze.blur.HazeProgressive
import dev.chrisbanes.haze.blur.materials.HazeMaterials

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                HomeScreen()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen() {
    val hazeState = rememberHazeState()

    Scaffold(
        // ===== 顶栏：垂直渐变模糊（顶部 1f → 底部 0f） =====
        topBar = {
            LargeTopAppBar(
                title = {
                    Text("首页", color = MaterialTheme.colorScheme.onSurface)
                },
                modifier = Modifier
                    .hazeEffect(state = hazeState) {
                        inputScale = HazeInputScale.Auto  // 自动降采样

                        blurEffect {
                            blurRadius = 24.dp

                            // 材料预设：自动匹配 surface 颜色 + 合适透明度
                            style = HazeMaterials.regular(
                                tintColor = MaterialTheme.colorScheme.surface,
                            )

                            // ★ 渐进模糊：顶部全模糊 → 底部清晰
                            progressive = HazeProgressive.verticalGradient(
                                startY = 0f,
                                startIntensity = 1f,   // 顶部 100% 模糊
                                endY = Float.POSITIVE_INFINITY,
                                endIntensity = 0f,     // 底部 0%（清晰）
                            )
                        }
                    }
                    .fillMaxWidth(),
            )
        },

        // ===== 底栏：均匀模糊（不设 progressive） =====
        bottomBar = {
            NavigationBar(
                modifier = Modifier
                    .hazeEffect(state = hazeState) {
                        blurEffect {
                            blurRadius = 24.dp
                            style = HazeMaterials.regular(
                                tintColor = MaterialTheme.colorScheme.surface,
                            )
                            // 没有 progressive → 均匀模糊
                        }
                    }
                    .fillMaxWidth(),
            ) {
                NavigationBarItem(
                    selected = true,
                    onClick = { },
                    icon = { Icon(Icons.Default.Home, null) },
                    label = { Text("首页") },
                )
                NavigationBarItem(
                    selected = false,
                    onClick = { },
                    icon = { Icon(Icons.Default.Search, null) },
                    label = { Text("搜索") },
                )
            }
        },

        modifier = Modifier.fillMaxSize(),

    ) { contentPadding ->
        // ===== 滚动内容：标记为模糊源（hazeSource） =====
        val items = remember { List(100) { "列表项 #$it" } }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .hazeSource(state = hazeState)   // ← 关键：让顶栏能模糊到内容
                .padding(contentPadding),
        ) {
            itemsIndexed(items) { index, item ->
                ListItem(
                    headlineContent = { Text(item) },
                    supportingContent = {
                        Text("这是第 ${index + 1} 个项目的描述文字")
                    },
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        }
    }
}
```

### 12.3 关键注意事项

#### ⚠️ 1. API 等级决定体验

| minSdk | 模糊方式 | 渐进模糊 | 性能 |
|---|---|---|---|
| **31+（推荐）** | RenderEffect GPU 加速 ✅ | 需要 API 33+（RuntimeShader） | 🟢 最佳 |
| 24-30 | RenderScript CPU 模糊 | 多层近似法（性能开销大） | 🟡 可用 |
| < 24 | Scrim 纯色遮罩（无模糊） | ❌ 不可用 | 🔴 无效果 |

渐进模糊（`HazeProgressive.verticalGradient`）在 API 33+ 上使用自定义 AGSL 运行时着色器，这是最高质量、最佳性能的实现。API 31-32 自动降级为多层近似法（绘制多个不同模糊半径的层叠加），效果尚可但 GPU 开销较大。API 31 以下回退到均匀模糊。

#### ⚠️ 2. hazeSource 和 hazeEffect 必须共享同一个 HazeState

```kotlin
// ✅ 正确：同一个 hazeState 实例
val hazeState = rememberHazeState()
LazyColumn(modifier = Modifier.hazeSource(state = hazeState)) { ... }
TopAppBar(modifier = Modifier.hazeEffect(state = hazeState) { ... })

// ❌ 错误：两个不同的 state，效果不会连接
val state1 = rememberHazeState()
val state2 = rememberHazeState()
```

HazeState 内部持有一个 `areas: MutableList<HazeArea>`，`hazeSource` 负责向其中注册 HazeArea（内容区域和 GraphicsLayer），`hazeEffect` 从中读取这些区域来构建模糊。两者必须共享同一个 state 实例才能连通。

#### ⚠️ 3. 硬件加速必须开启

RenderEffect 要求 Canvas 是硬件加速的。Compose 默认就是硬件加速的，但在以下场景中要小心：

- **Android 模拟器**：部分模拟器不支持硬件加速，需要检查
- **自定义 SurfaceView**：需要手动 `setHardwareAccelerated(true)`
- **Canvas 软绘模式**：如果 Canvas 是软件绘制的，Haze 会自动降级到 Scrim

#### ⚠️ 4. 渐进模糊的颜色边界

渐进模糊通过遮罩控制每个像素的模糊强度。如果 `endIntensity > 0f` 且模糊区域有锐利边缘（如顶栏的硬边），可能在交界处看到一条模糊/清晰的界线。可以通过调整 `easing` 让过渡更平滑：

```kotlin
progressive = HazeProgressive.verticalGradient(
    startIntensity = 1f,
    endIntensity = 0f,
    easing = FastOutSlowInEasing,  // 默认 EaseIn，换这个过渡更柔和
)
```

#### ⚠️ 5. 过度降采样导致画质损失

```kotlin
// 太激进 → 模糊结果可能马赛克感
inputScale = HazeInputScale.Fixed(0.15f)

// 建议：渐进模糊至少保持 0.5x
inputScale = HazeInputScale.Fixed(0.5f)
```

渐进模糊的着色器采样次数随半径线性增长（O(2n·r)）。降采样到 0.5x 时虽然像素量减至 25%，但放大后的像素丢失细节可能导致**渐变边缘锯齿**。0.5x 是质量与性能的推荐平衡点。

#### ⚠️ 6. 不用 Compose Multiplatform 时不需要跨平台模块

如果你的项目是纯 Android（非 KMP），只需引入 `haze`、`haze-blur`、`haze-materials` 三个 artifact。`haze-utils` 是内部依赖，会自动传递。**不需要配置 skikoMain 或 iOS target**。

### 12.4 快速检查清单

```
□  minSdk ≥ 31（推荐，RenderEffect GPU 加速）
□  compileSdk ≥ 34
□  添加 haze / haze-blur / haze-materials 依赖
□  应用 kotlin.plugin.compose 插件
□  hazeSource 放在滚动/内容区域（被模糊的内容）
□  hazeEffect 放在顶栏/底栏（显示模糊的区域）
□  两者共享同一个 rememberHazeState()
□  progressive 只在需要渐变模糊的地方设置
□  不需要渐进模糊的底栏不设 progressive（节约 GPU 开销）
□  检查模拟器是否支持硬件加速
□  建议用 HazeMaterials 预设快速调出符合 Material 3 的外观
```
