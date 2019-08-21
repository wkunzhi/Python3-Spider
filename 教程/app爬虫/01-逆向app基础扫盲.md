# APK基本结构
> 解压后的安卓目录

| 目录名 | 意义 | 
| --- | --- | 
| **assets** | 资源文件(图片、音频、数据库、网页、配置文件等) |  
| **res** | 资源文件，需要编译(布局)图片、图标、字符串、样式、颜色 |  
| **lib** | 各种平台下使用的对应的so文件 |  
| **libs** | 第三方包、存放so文件 |  
| **META-INF** | APK签名文件 |  
| **resources.arsc** | 资源加密(语言包) |  
| **AndroidManifest.xml** | 清单文件(图标、界面、权限、入口) |  
| **classes.dex**	 | 源代码  |  

# 虚拟机
## JVM
> `Java` 虚拟机，运行的是 `.java` 文件编译后的 `.class` 文件

## DVM
> Android4.4 及以前使用的都是 Dalvik 虚拟机，
 
- Apk 在打包的过程中会先将 java 等源码通过 `javac` 编译成 `.class` 文件
- Dalvik 虚拟机只会执行 `.dex` 文件，所以dx会将 `.class` 文件转换成Dalvik虚拟机执行的 `.dex` 文件。
- Dalvik 虚拟机在启动的时候会先将 `.dex` 文件转换成快速运行的机器码，我们的 app启动慢，是因为应用冷启动的时候有一个**合包的过程** Dalvik 虚拟机的 JIT 特性。

## ART
> ART 虚拟机是在 **Android5.0** 才开始使用的Android虚拟机

- ART 虚拟机必须要兼容 Dalvik 虚拟机的特性，但是ART有一个很好的特性AOT（ahead of time），这个特性就是我们在安装APK的时候就将dex直接处理成可直接供ART虚拟机使用的机器码
- ART 虚拟机将 `.dex` 文件转换成可直接运行的 `.oat` 文件，**ART虚拟机天生支持多 dex**，所以也不会有一个合包的过程，所以ART虚拟机会很大的提升APP冷启动速度。
- [x] **`Xposed hook`** 的是Java代码，所以 **`Xposed 87版`** 不支持 **`5.0`** 以及以上系统。
- [x] **`Xposed 89版`** 支持安卓 **`5.0-7.1`**
			
			
# Mac 正向开发环境配置
## IDE、JDK、SDK下载
> 选择 Mac 环境包

[IDE中心](http://www.android-studio.org/)
[JDK下载](http://jdk.android-studio.org/)
[SDK下载](http://tools.android-studio.org/index.php/sdk)
  
  
## IDE、JDK、SDK配置
把这三个文件解压放到工作目录中，因为后面要链接这里，你要记住这个目录地址；然后我们先安装jdk
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/1.png?x-oss-process=image/resize,h_600)

**如果是按照教程按照的话，那么 JDK 路径在 `/Library/Java/JavaVirtualMachines/jdk1.8.0_77.jdk/Contents/Home`**
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/2.png)

## 创建 android studio 项目
创建新项目
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/11.png?x-oss-process=image/resize,h_400)
项目结构概述
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/12.png)

## 配置模拟器

选择模拟器机型运行
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/3.png?x-oss-process=image/resize,h_400)

如果没有机型那么点击 create 一个
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/4.png?x-oss-process=image/resize,h_400)

按照好之后运行，hellow word 再现江湖
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/5.png?x-oss-process=image/resize,h_400)


				
# 签名
## 为什么要签名
> 统要求每一个Android应用程序必须要经过数字签名才能够安装到系统中，也就是说如果一个Android应用程序没有经过数字签名，是没有办法安装到 系统中的！Android通过数字签名来标识应用程序的作者和在应用程序之间建立信任关系，不是用来决定最终用户可以安装哪些应用程序。这个数字签名由应 用程序的作者完成，并不需要权威的数字证书签名机构认证，它只是用来让应用程序包自我认证的。

## 生成 jks 签名
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/6.png?x-oss-process=image/resize,h_400)

创建签名
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/7.png?x-oss-process=image/resize,h_400)

导入签名文件
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190818/8.png?x-oss-process=image/resize,h_400)		
# 逆向工具下载
> mac 环境下玩逆向， 很多工具不用了， 需要配置 windows 虚拟机

## jadx
作者目前在更新

- [x] [**官方代码仓库**](https://github.com/skylot/jadx)
- [x] [**GUI版本下载**](https://github.com/skylot/jadx/releases/tag/v1.0.0)
- [x] **优点** 更新快，反编译牛逼，代码清晰
- [x] **缺点** 吃内存，不过还好我是 32G 内存哈哈

## JEB
- [x] [**官方网站**](https://www.pnfsoftware.com)
- [x] **优点** 可动态调试， 内存消耗小
- [x] **缺点** 收费， 反编译出来的java伪代码展示性不够友好

## Android Killer
> Mac 用不了，只能装在 win10 虚拟机上。作者已经停止更新但部分功能比较好用。

## GDA
> Mac 用不了，最后一次更新是2015年， 作者看来看来打算更新了
	
- [x] [**下载网址**](http://www.gda.wiki:9090/index.php)

# 逆向辅助工具
## 模拟器

| 模拟器 | 安卓版本 | 调试 | xposed |
| --- | --- | --- | --- |
| 夜神 | 4.4 | adb connect 127.0.0.1:62001 | 支持 |
| 逍遥 | 4.4 | adb调试端口为127.0.0.1:21503 | 支持 |
| 雷电 | 5.1 | 动态调试稳定修改apk以后无需重签名，支持覆盖安装 | 不支持 |