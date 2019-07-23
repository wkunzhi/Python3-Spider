# Python Crawler


![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/python-3.7-green.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/Scrapy-1.6.0-blue.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/selenium-3.141.0-yellew.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/Pyppeteer-0.0.25-orange.svg) 




| Author  | Zok |
| --- | --- |
| Email | 362416272@qq.com |
| BLOG | www.zhangkunzhi.com |
| Introduce | 数据解密、反爬处理、学习教程 |


-------

记录并分享进步的过程

## 一、反爬处理案例
- [x] [【拼多多】登陆参数解密](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/PinDuoDuo)
- [x] [【大众点评】字体 | 坐标解密](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/DianPing)
- [x] [【RSA | AES | DES | DES3】加密 解密](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/RSA_AES_DES_DES3)
- [x] [【bilibili】视频下载器](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/bilibili)
- [x] [【GitHub】自动登陆](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/GitHub)
- [x] [【淘宝】自动登陆 | 过检测](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/TaoBao)
- [x] [【百度】翻译](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/BaiDu)
- [x] [【51job】查岗位](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/51Job)
- [x] [【美团】解析数据 | token生成器](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/MeiTuan)
- [x] [【美团】全国区域爬虫](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/MeiTuanArea)
- [x] [【快递查询】-快递单号查询](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/KuaiDi)


## 二、教程
- [【APP抓包】](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/如何抓手机APP)
- [【Pyppeteer说明、案例】](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/%E6%95%99%E7%A8%8B/Pyppeteer)
- [【爬虫相关博客公众号推荐】](https://github.com/wkunzhi/SpiderCrackDemo/blob/master/%E6%95%99%E7%A8%8B/%E5%8D%9A%E5%AE%A2%E5%85%AC%E4%BC%97%E5%8F%B7%E6%8E%A8%E8%8D%90.md)

## 三、原创工具
> 此工具包在我另外一个项目中，欢迎 star

- [【解密工具】可拓展式解密器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Decode)
- [【自动注册】验证短信接收器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Register)
- [【付费代理IP池】监控维护器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Proxy)
- [【cookies池】-美团cookies池](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Cookies)
- [【跨数据库迁移器】-开发中](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/DataMigration)
- [【网络图片并发直传OSS】](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/OSS)
- [【JS攻防-自动生成encrypt结果】](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Jsencrypt)


## 四、爬虫项目
- [x] [【美团】全国区域爬虫](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/爬虫项目/MeiTuanArea)
- [ ] [【房产】地产爬虫 【开发中】](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/爬虫项目/HouseSpider)



-------


# 目录

```
反爬处理案例
│
├── PinDuoDuo                           // -----拼多多解密-----
├── DianPing                            // -----大众点评-----
│   ├── parse_address_poi.py            // 坐标加密
│   └── parse_font_css.py               // CSS字体解密
├── GitHub                              // ------GitHub-----
│   └── login.py                        // GitHub自动登陆
├── JingDong                            // -------京东-------
├── BaiDu                               // -------百度-------
│   └── translation.py                  // 百度翻译
├── MeiTuan                             // -------美团-------
│   ├── get_login_cookies.py            // 基于pyppeteer登陆并获取cookies
│   ├── parse_play_areas.py             // 三级区域解析器(休闲板块)
│   ├── parse_play_info.py              // 休闲会所商铺数据解析
│   ├── parse_hotel_info.py             // 酒店基础数据解析
│   ├── parse_hotel_comments.py         // 酒店评论解析
│   ├── create_food_token.py            // 餐饮页Token生成器
│   ├── parse_food_comments.py          // 获取用户评论数据
│   └── parse_food_info.py              // 解析餐馆数据
├── TaoBao                              // -------淘宝-------
│   ├── login_for_sina.py               // 淘宝自动登陆-新浪入口
│   ├── auto_login_pyppeteer.py         // 淘宝自动登陆-淘宝账号
│   ├── login_for_pyppeteer.py          // 利用pyppeteer过webdriver检测
│   └── login_for_mitmproxy.py          // 利用mitmproxy过webdriver检测
├── BiliBili                            // -------BiliBili-------
│   └── login.py                        // 视频下载器
├── MeiTuanArea                         // -------基于美团全国区域采集器-------
├── KuaiDi                              // -------快递单号快速查询-------
│── 51Job                               // -------51job-------
│   └── select_job.py                   // 编码转换，岗位查询
└── RSA_AES_DES_DES3                    // 主流编码加密解密


教程    
│
├── 爬手机APP
│    ├── 自动化框架Airtest.md
│    └── 抓包工具.md 
├── pyppeteer
└── 爬虫相关博客公众号推荐   


原创工具
├── Proxy                               //      代理工具包 
│   ├── ZhiMaProxyPool.py               // 芝麻代理ip清洗工具
│   ├── ZhiMaProxyUseDemo.py            // 芝麻代理池客户端使用Demo
│   ├── XDLProxyPool.py                 // 讯代理ip清洗工具
│   └── XDLProxyUseDemo.py              // 讯代理池客户端使用Demo
├── Register                            //      注册类工具
│   └── MessageCode.py                  // 异步验证短信接收器
├── Cookies                             //      Cookies获取
│   └── MeiTuan                         // 异步并发批量获取美团登陆Cookies
├── DataMigration                       //      跨数据库迁移
│   ├── db                              // 基础数据库封装包
│   └── migration                       // 迁移器
├── Decode                              //      可拓展式解密器
├── Jsencrypt                           //      自动生成encrypt加密
└── README.md


爬虫项目   
│
├── MeiTuanArea                         //美团全国区域采集器(scrapy)

```
