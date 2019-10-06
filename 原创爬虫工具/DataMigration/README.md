# 工作中经常有这种需求
> 将采集好的mongodb数据转存到mysql中，或者是redis数据转到mongodb，于是打算封装一个组件便于以后调用

# mysql转存mongo
1. 在 config 中配置 mongo 与 mysql 连接
2. 在 `msyql_to_mongo.py` 下方实例化时填入 `需要转换mysql表名`, `mongo库名`, `mongo表名`
3. 调用 `mi.easy_to_mongo()` 即可将 mysql 中的 数据导入到 mongodb

> 当然也支持自定义转换，在类中添加即可