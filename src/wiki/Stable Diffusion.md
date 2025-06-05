# Stable Diffusion:图像生成AI模型
## 下载地址
- [StabilityAI官网](https://stability.ai)
- [OneThingAI云部署平台](https://console.onethingai.com/)

## 安装教程
### WebUI(模块化)
- [StableDiffusion](https://github.com/Stability-AI/StableDiffusion)
  - [Stable Diffusion WebUI A1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
  - [Stable Diffusion WebUI Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge)

### ComfyUI(工作流)
1. 部署[Git](https://github.com/git-for-windows/git/releases)
    - 若下载Installer可跳过该步骤
    - 若下载Portable则先解压把根目录下的bin加入环境变量PATH中
2. 部署[ComfyUI](https://www.comfy.org)
    - [ComfyUI Desktop](https://dl.todesktop.com/241012ess7yxs0e/windows/nsis/x64)：按照步骤安装即可
    - [ComfyUI Portable](https://github.com/comfyanonymous/ComfyUI)：解压7z，运行根目录下的run_nvidia_gpu.bat，若无NVIDIA显卡则运行run_cpu.bat
3. 访问ComfyUI
    - 均可通过浏览器访问[8000端口](http://localhost:8000)

## 模型下载
### CheckPoints
> 主模型、大模型、底模、基础模型等。通过特定训练最终形成的一个保持该领域特征的一种综合算法合集，可以精准的匹配你的需求。比如摄影写实模型、3D模型、二次元模型、室内设计模型等等。Checkpoint 的训练难度大，需要的数据集大，生成的体积也较大，动则占用几个G的磁盘空间。
- [HuggingFace(抱脸)](https://huggingface.co)
    - [Anything v5](https://huggingface.co/swl-models/Anything-v5.0-PRT/resolve/8f4143c96d5a9a9869061b5c3ea71a1d962790be/Anything-v5.0-PRT-RE.safetensors)
    - [StableDiffusion3 Medium](https://huggingface.co/stabilityai/stable-diffusion-3-medium/tree/main)
    - [StableDiffusion3 Large](https://huggingface.co/stabilityai/stable-diffusion-3.5-large/tree/main)
- [Civitai(C站)](https://civitai.com/)
    - [AiARTiST-HyperRAY XL(室内设计)](https://civitai.com/models/430186/aiartist-hyperray-xl-xl-interior-design-system)
- [NovelAI(泄露模型)](magnet:?xt=urn:btih:5bde442da86265b670a3e5ea3163afad2c6f8ecc)

### UpscaleModels
> 超分辨率模型
- [超分模型下载](https://openmodeldb.info/)
    - [BSRGAN x2](https://github.com/cszn/KAIR/releases/download/v1.0/BSRGANx2.pth)
    - [RealESRGAN x4Plus Anime](https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.4/RealESRGAN_x4plus_anime_6B.pth)
    - [UltraSharp 4x](https://mega.nz/folder/qZRBmaIY#nIG8KyWFcGNTuMX_XNbJ_g)
    - [SwinIR 4x](https://github.com/Kim2091/Kim2091-Models/releases/download/4x-SwinIR-M_Pretrain/4x-SwinIR-M_Pretrain.pth)

### VAE
> 变分自编码器模型可以当作滤镜，目前针对 Stable Diffusion 主流的 VAE 模型有两个，二次元使用 kl-f8-anime2VAE, 写实风格使用 vae-ft-mse-840000-ema-pruned。
- [AnimeVAE-NovalAI原版](https://huggingface.co/swl-models/animvae/resolve/main/animevae.pt)

### Hypernetwork
> 超网络模型

### Embedding
> 文本嵌入模型，应用于提示词中，是一类经过训练的提示词合集，主要用来提升画质，规避一些糟糕的画面。比如：badhandv4、Bad_picture、bad_prompt、NG_Deep Negative、EasyNegative，这些是经常用到的反向提示词嵌入模型，可以单独使用或者组合使用。

### LoRA
> 低秩适应模型作为大模型的一种补充，能对生成的图片进行单一特征的微调，比如生成的人物图片具有相同的人脸特征、穿着特定服装、具备特定画风等等。Lora 模型体积较小，一般几十几百兆， 个人主机就可训练自己需要的 Lora 模型。

### Controlnet
> 控制模型

### IPAdapter
> 风格迁移模型

### CustomNodes
> ComfyUI自定义节点
- [ComfyUI Manager](https://github.com/ltdrdata/ComfyUI-Manager)
    - 手动安装节点管理器:在软件根目录custom_nodes文件夹下使用Git命令`git pull https://github.com/ltdrdata/ComfyUI-Manager.git`

- [ComfyUI Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation.git)
    - 界面翻译:安装后需进入设置-AGL-Locale-AGLTranslation-langualge调整语言

- [AlekPet](https://github.com/AlekPet/ComfyUI_Custom_Nodes_AlekPet.git)
    - 无法Import时进入虚拟环境执行`ComfyUI\.venv\Scripts\python -m pip install --upgrade setuptools`

- [Inspire Pack](https://github.com/ltdrdata/ComfyUI-Inspire-Pack)
    - A1111WebUI兼容性支持
        - KSampler(Inspire):ComfyUI使用CPU生成随机噪声，而A1111使用GPU
            - 配合[Advanced CLIP Text Encode](https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_emb)的CLIP文本编码器(BNK)，权重插值选择A1111

## 使用教程
### 基础知识
入坑可以看[B站秋葉](https://space.bilibili.com/12566101)的视频，零基础推荐下载整合包使用。
对原理大致了解可以从[基础工作流及模型介绍](https://www.cnblogs.com/joy99/p/18399471)了解核心原理。

### Flux模型指南
- [Flux.1 ComfyUI 对应模型安装及教程指南](https://comfyui-wiki.com/zh/tutorial/advanced/flux1-comfyui-guide-workflow-and-examples)

### 前沿资讯
- [AIGC前沿技术](https://github.com/602387193c/ComfyUI-wiki)