# Android Edge-to-Edge 实现文档

## 概述

本文档说明了如何在Flutter Android项目中实现edge-to-edge（边到边）显示特性。Edge-to-edge让应用内容延伸到系统栏（状态栏和导航栏）后面，创建更加沉浸式的用户体验。

## 实现内容

### 1. 添加依赖

在 `/android/app/build.gradle.kts` 中添加了AndroidX Core库：

```kotlin
dependencies {
    implementation("androidx.core:core:1.17.0")
}
```

这个库提供了`WindowCompat.enableEdgeToEdge()`方法，用于启用edge-to-edge显示。

### 2. 修改MainActivity

在 `/android/app/src/main/java/com/example/flutter_test/MainActivity.java` 中启用edge-to-edge：

```java
package com.example.flutter_test;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import io.flutter.embedding.android.FlutterActivity;

public class MainActivity extends FlutterActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Enable edge-to-edge display
        WindowCompat.enableEdgeToEdge(getWindow());
        super.onCreate(savedInstanceState);
    }
}
```

**关键点：**
- 必须在`super.onCreate()`之前调用`WindowCompat.enableEdgeToEdge()`
- 这会使系统栏透明，并允许内容绘制在系统栏后面
- 系统栏图标颜色会根据系统主题自动调整

### 3. 更新主题样式

在 `/android/app/src/main/res/values/styles.xml` 和 `/android/app/src/main/res/values-night/styles.xml` 中添加了edge-to-edge支持：

```xml
<style name="LaunchTheme" parent="@android:style/Theme.Light.NoTitleBar">
    <item name="android:windowBackground">@drawable/launch_background</item>
    <!-- Enable edge-to-edge display -->
    <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
</style>

<style name="NormalTheme" parent="@android:style/Theme.Light.NoTitleBar">
    <item name="android:windowBackground">?android:colorBackground</item>
    <!-- Enable edge-to-edge display -->
    <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
</style>
```

**`windowLayoutInDisplayCutoutMode`属性说明：**
- `shortEdges`：允许内容延伸到屏幕的短边刘海区域
- 这确保了在有刘海/挖孔的设备上内容能正确显示

## 效果

启用edge-to-edge后：
- ✅ 状态栏变为透明
- ✅ 导航栏变为透明
- ✅ 应用内容延伸到系统栏后面
- ✅ 支持刘海屏/挖孔屏设备
- ✅ 系统栏图标颜色自动适配
- ✅ 在深色模式下正常工作

## Flutter层面的注意事项

虽然Android原生层已经启用了edge-to-edge，但Flutter应用可能需要处理系统栏遮挡问题。

### 使用SafeArea

在Flutter代码中使用`SafeArea`小部件来避免内容被系统栏遮挡：

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: SafeArea(
      child: YourContent(),
    ),
  );
}
```

### 手动处理Insets

如果需要更精细的控制，可以使用`MediaQuery`获取系统栏的尺寸：

```dart
@override
Widget build(BuildContext context) {
  final padding = MediaQuery.of(context).padding;
  
  return Scaffold(
    body: Padding(
      padding: EdgeInsets.only(
        top: padding.top,
        bottom: padding.bottom,
      ),
      child: YourContent(),
    ),
  );
}
```

## 测试建议

1. **在真机上测试**：模拟器可能无法完全展示edge-to-edge效果
2. **测试不同导航模式**：
   - 三键导航
   - 手势导航
3. **测试深色模式**：确保在深色模式下系统栏图标清晰可见
4. **测试刘海屏设备**：如果可能，在有刘海/挖孔的设备上测试

## 兼容性

- **最低API级别**：API 21 (Android 5.0)
- **推荐API级别**：API 28+ 以获得最佳效果
- **自动启用**：API 35+ (Android 15) 默认启用edge-to-edge

## 故障排除

### 问题：内容被系统栏遮挡

**解决方案**：在Flutter代码中使用`SafeArea`或手动处理padding

### 问题：系统栏图标看不清

**解决方案**：`WindowCompat.enableEdgeToEdge()`会自动处理图标颜色，如果仍有问题，检查应用背景色是否与系统栏图标颜色冲突

### 问题：刘海区域显示异常

**解决方案**：确保`windowLayoutInDisplayCutoutMode`设置为`shortEdges`

## 参考资料

- [Android官方文档 - Edge-to-Edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge)
- [WindowCompat API文档](https://developer.android.com/reference/androidx/core/view/WindowCompat)
- [Display Cutouts文档](https://developer.android.com/develop/ui/views/layout/display-cutout)
