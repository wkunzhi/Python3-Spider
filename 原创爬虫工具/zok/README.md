# Zok 组件使用说明
> by: 362416272@qq.com  自用

### 目录
- repetition 内容更新处理
- save 通用持久化存储组件
- random_UA 随机UA
- proxies 阿布云代理组件



**mysql储存**
1. 必须在zok_config中配置要持久化的数据库账户密码
2. 在爬虫项目文件pipelines管道中，引入并使用
```python
from zok.save.to_mysql import SaveToMysqlBase

class CityLandmarkListPipeline(SaveToMysqlBase):
    member = 'city'  # redis集合名  如果是分布式无需设置

    @staticmethod
    def get_sql(item):
        sql = """INSERT INTO base_city_landmark(city, county, landmark) VALUES ("{city}","{county}","{landmark}") """.format(
            city=item['city'],
            county=item['county'],
            landmark=item['landmark'],
        )
        return sql
        
'''必须调用 def_sql(item)方法，并返回sql语句即可'''
```

**随机UA**
```python
# setting.py中 加入即可
DOWNLOADER_MIDDLEWARES = {
   'zok.random_UA.ua_random.RandomUserAgentMiddleware': 20,
}
```

**代理ip设置**
```python
# 在setting中配置即可
DOWNLOADER_MIDDLEWARES = {
   'zok.proxies.proxies.ProxyMiddleware': 15,  # 自定义的中间件
}
```

**基于redis内容去重更新**
> 原理： 在储存数据之前取到hash数据值，并加以对比，如果有值就跳过不储存，无值就set(md5, id)
1. 开启redis服务
2. 在 zok_config中配置 redis配置
3. 应用储存组件 mysql 就会自动启用去重增量更新功能
    