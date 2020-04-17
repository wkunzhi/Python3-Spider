# 美团城市采集
> 因为全站爬取需要用到，区域基础数据。这里单独抽离出来。

## 配置
在 settings 内配置 mysql 与 百度api_ak 即可

## 数据库设计
> 因为最终数据将会用到Mysql上，区域一共有4个层级，分别是省市、市、区域、街道，这里按照业务需求拆分到4张表中。

![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/区域表.png)

## 坐标拾取
> 通过百度API调用地址，获取坐标并存入库中

## 效果
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/区域坐标.png)