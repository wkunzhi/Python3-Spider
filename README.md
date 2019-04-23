# SpiderCrackDemo


![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/python-3.7-green.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/Scrapy-1.6.0-blue.svg) 
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/ico/selenium-3.141.0-yellew.svg) 

Anti - crawling website crack Demo, we hope to update together

> 各站反爬处理攻略、不断更新中..


| Author  | Zok |
| --- | --- |
| Email | 362416272@qq.com  |
| BLOG | www.zhangkunzhi.com |
| Introduce | 数据解密、反爬处理、模拟登陆、POST登陆 |


-------
## Demo
- [x] [大众点评-字体解密](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/DianPing)
- [x] [大众点评-坐标解密](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/DianPing)
- [x] [GitHub-post自动登陆](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/GitHub)
- [x] [淘宝-登陆mitmproxy](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TaoBao)
- [x] [淘宝-登陆新浪入口](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TaoBao)
- [x] [淘宝-webdriver检测跳过方法](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TaoBao)
- [x] [天眼查-登陆](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/TianYanCha)
- [x] [51job-查岗位](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/51Job)
- [x] [美团-爬用户评论](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)
- [x] [美团-解析餐馆数据](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)
- [x] [美团-餐饮页token生成](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/MeiTuan)


<hr>


# directory tree



```
├── DianPing                            // -----大众点评-----
│   ├── parse_address_poi.py            // 坐标加密
│   └── parse_font_css.py               // CSS字体解密
├── GitHub                              // ------GitHub-----
│   └── login.py                        // GitHub自动登陆
├── JingDong                            // -------京东-------
├── MeiTuan                             // -------美团-------
│   ├── parse_comments.py               // 获取用户评论数据
│   ├── create_food_token.py            // 餐饮页Token生成器
│   └── parse_restaurant_info.py        // 解析餐馆数据
├── TaoBao                              // -------淘宝-------
│   ├── login_for_sina.py               // 淘宝自动登陆
│   ├── login_for_pyppeteer.py          // 利用pyppeteer过webdriver检测
│   └── login_for_mitmproxy.py          // 利用mitmproxy过webdriver检测
├── TianYanCha                          // -------天眼查-------
│   └── login.py                        // 自动登陆，并获取企业信息
└── 51Job                               // -------51job-------
    └── select_job.py                   // 编码转换，岗位查询

```


<hr>


# The sample picture

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
