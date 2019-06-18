[TOC]

# 安装模块

```bush
pip3 install redis
pip3 install apscheduler
pip3 install reuqest
pip3 install python-dateutil
```

# 讯代理池使用 
1. 登陆讯代理 进入API页码将下面下方生成的API复制
    ![讯代理API](https://www.zhangkunzhi.com/images/xdl3.png)
    
2. 将链接复制到项目该位置
    ![讯代理API](https://www.zhangkunzhi.com/images/xdl4.png)
 
3. 配置redis， 默认是本机
    ![讯代理API](https://www.zhangkunzhi.com/images/xdl5.png)
 
4. 启动程序，大功告成，只需要在调用ip的时候对其进行增减分操作即可
    ![讯代理API](https://www.zhangkunzhi.com/images/xdl1.png)
    ![讯代理API](https://www.zhangkunzhi.com/images/xdl2.png)

# 芝麻代理池使用

1. 首先登陆你的芝麻代理后台管理，找到自己的key如图
    ![key位置](https://www.zhangkunzhi.com/images/芝麻1.png)

1. 在代码下方配置key
    ![key位置](https://www.zhangkunzhi.com/images/填入芝麻key.png)
    
1. 在代码中配置 redis库连接 **默认链接的本地**
    ![key位置](https://www.zhangkunzhi.com/images/代理模块.png)
    
1. 启动程序
    > 如果在服务端可以使用后台运行命令
    `nohup python3 ProxyPool.py >my.log &`
 
1. 第一次启动芝麻代理会绑定你的ip白名单，稍等片刻就会开始提取     
    
    ![key位置](https://www.zhangkunzhi.com/images/提取ip.png)
    
1. 链接redis可以看到ip池了，大功告成
    ![key位置](https://www.zhangkunzhi.com/images/20个ip.png)
    
1. 后续在使用代理ip时，根据访问结果对代理ip积分增减即可，后续会更新这个Demo继续关注Github即可。[**传送门**](https://github.com/wkunzhi/SpiderUtilPackage)
    
    
# 额外配置
- 可以自由配置，代理池上线值(默认20),实例化时配置即可
    ```python
    zm = ZhiMaPool('key', ip_sum=100)
    ```
- 可以自由配置，只取可用时间xx以上的ip(默认1号套餐下的1000秒以上),实例化时配置即可
    ```python
    zm = ZhiMaPool('key', ttl=1000)
    ```
- 还可以配置 每次提取数、提取套餐类型、提取ip HTTP或者HTTPS或者Sockets
 