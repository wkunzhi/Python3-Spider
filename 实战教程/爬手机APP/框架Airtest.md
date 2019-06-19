
![](https://www.zhangkunzhi.com/images/效果图.gif)
# Airtest 简介
[**我的博客**](https://www.zhangkunzhi.com)

> 目前app自动化爬虫最常用的 自动化工具就是[**Appium**](http://appium.io/)， 但是今天给大家介绍另外一款有网易开发的自动化框架  [**Airtest**](http://airtest.netease.com/)

- [x] AirtestIDE 是一个跨平台的UI自动化测试编辑器，适用于游戏和App。
- [x] 自动化脚本录制、一键回放、报告查看
- [x] 支持基于图像识别的 Airtest 框架
- [x] 支持基于UI控件搜索的 Poco 框架
- [x] 能够运行在Windows和MacOS上

总结来说就是自动化应用轻松简单！

![](https://www.zhangkunzhi.com/images/shouji集群.png)
# 优缺点
> **优点** 

- 自带强大的 IDE 工具
- 语句简单，可视化操作支持截图功能
- 爬取APP中的**文字信息**非常方便简单

> **缺点** 

- 目前只支持 Python 语言 
- 如果要作为游戏脚本辅助的不如模拟器+易语言+大漠那套组合
- 作为APP爬虫案例与生态不及Appium。 但是使用简单，学习成本低！

总结： 如果只是爬一些文字类的信息，逻辑难度不算太大可以使用这个， 但是如果要爬取一下图片、视频等连接还是要去分析APP的接口。因为原生安卓是不会将图片链接反馈到自动化工具上的。

# 文档
[**这里是中文文档**](http://airtest.netease.com/docs/docs_AirtestIDE-zh_CN/1_quick_start.html)，如何链接手机与配置已经介绍得非常清楚了，我再重复的话就是画蛇添足了。



# 如何用 python 获取数据？
> 因为 该框架支持 python，所以直接在  Airtest 自带的框架上调试好流程后，直接复制到 pycharm 中也可以运行的。

![](https://www.zhangkunzhi.com/images/运行1.png)

![](https://www.zhangkunzhi.com/images/运行2.png)

如果要批量获取数据就需要编写逻辑代码，后面有时间的话会在 [**我的 GitHub**](https://github.com/wkunzhi) 上更新一些案例。有兴趣的同学可以关注一下。

