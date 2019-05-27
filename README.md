# SpiderCrackDemo


![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/python-3.7-green.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/Scrapy-1.6.0-blue.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/selenium-3.141.0-yellew.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/Pyppeteer-0.0.25-orange.svg) 

Anti - crawling website crack Demo, we hope to update together


| Author  | Zok |
| --- | --- |
| Email | 362416272@qq.com  |
| BLOG | www.zhangkunzhi.com |
| Introduce | 数据解密、反爬处理、模拟登陆、POST登陆 |


-------

最近在做MT和DP的整站爬取，所以经常更新一些拆分开来的小demo

## Demo
- [x] [大众点评-字体解密](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/DianPing)
- [x] [大众点评-坐标解密](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/DianPing)
- [x] [bilibili-视频下载器](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/bilibili)
- [x] [GitHub-post自动登陆](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/GitHub)
- [x] [淘宝-自动登陆-新浪入口](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TaoBao)
- [x] [淘宝-自动登陆-淘宝账号](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TaoBao)
- [x] [淘宝-pyppeteer过webdriver检测](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TaoBao)
- [x] [淘宝-mitmproxy过webdriver检测](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TaoBao)
- [x] [百度-翻译](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/BaiDu)
- [x] [天眼查-登陆](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TianYanCha)
- [x] [51job-查岗位](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/51Job)
- [x] [美团-爬用户评论](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)
- [x] [美团-解析餐馆数据](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)
- [x] [美团-餐饮页token生成](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)
- [x] [美团-三级区域解析器](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)
- [x] [美团-休闲会所店铺信息解析器](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)
- [x] [美团-全国区域scrapy爬虫](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuanArea)
- [x] [快递110-快递单号查询](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/KuaiDi)


-------


# directory tree



```
├── DianPing                            // -----大众点评-----
│   ├── parse_address_poi.py            // 坐标加密
│   └── parse_font_css.py               // CSS字体解密
├── GitHub                              // ------GitHub-----
│   └── login.py                        // GitHub自动登陆
├── JingDong                            // -------京东-------
├── BaiDu                               // -------百度-------
│   └── translation.py                  // 百度翻译
├── MeiTuan                             // -------美团-------
│   ├── parse_comments.py               // 获取用户评论数据
│   ├── create_food_token.py            // 餐饮页Token生成器
│   ├── parse_play_areas.py             // 三级区域解析器(休闲板块)
│   ├── parse_play_info.py              // 休闲会所商铺数据解析
│   ├── get_login_cookies.py            // 基于pyppeteer登陆并获取cookies
│   └── parse_restaurant_info.py        // 解析餐馆数据
├── TaoBao                              // -------淘宝-------
│   ├── login_for_sina.py               // 淘宝自动登陆-新浪入口
│   ├── auto_login_pyppeteer.py         // 淘宝自动登陆-淘宝账号
│   ├── login_for_pyppeteer.py          // 利用pyppeteer过webdriver检测
│   └── login_for_mitmproxy.py          // 利用mitmproxy过webdriver检测
├── TianYanCha                          // -------天眼查-------
│   └── login.py                        // 自动登陆，并获取企业信息
├── BiliBili                            // -------BiliBili-------
│   └── login.py                        // 视频下载器
├── MeiTuanArea                         // -------基于美团全国区域采集器-------
├── KuaiDi                              // -------快递单号快速查询-------
└── 51Job                               // -------51job-------
    └── select_job.py                   // 编码转换，岗位查询

```


<hr>



# The sample picture
- [x] **快递单号快速查询**

![image](https://www.zhangkunzhi.com/images/快递单号查询.png)


- [x] **美团三级区域解析器**

![image](https://www.zhangkunzhi.com/images/区域解析.png)
![image](https://www.zhangkunzhi.com/images/json格式化.png)

------

- [x] **美团休闲娱乐商铺信息**

![image](https://www.zhangkunzhi.com/images/休闲娱乐.png)

------

- [x] **TB过检测登陆**

![image](https://www.zhangkunzhi.com/images/WX20190423-220327.png)

------

- [x] **美团餐饮数据解析**

![image](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/gif/%E7%BE%8E%E5%9B%A2%E9%A4%90%E9%A6%86%E6%95%B0%E6%8D%AE%E6%BC%94%E7%A4%BA.gif)

------

- [x] **51job查岗位**

![image](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/WX20190415-210839%402x.png)

------

- [x] **美团评论解析**

![image](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/%E7%BE%8E%E5%9B%A2%E8%AF%84%E8%AE%BA.png)

------
