# -*- coding: utf-8 -*-
# __author__ = "zok" 
# Date: 2019/3/7  Python: 3.7

import pymysql

from zok.zok_config import *
from zok.repetition.update_cache import CacheRedis


class SaveToMysqlBase(object):
    """
    mysql储存基类
    新增语法 INSERT INTO 表名(city, county, district) VALUES ("%s","%s","%s")
    更新语法 UPDATE 表名 SET mail = "playstation.com" WHERE user_name = "Peter"
    """
    member = None  # 不设置默认不开启 redis去重校验
    conn = None
    cursor = None  # 游标对象
    redis = CacheRedis()

    def open_spider(self, spider):
        print('开始爬虫，链接数据库')
        self.conn = pymysql.Connect(
            host=MYSQL_HOST,
            port=MYSQL_PORT,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            db=MYSQL_DB_NAME,
        )

    def process_item(self, item, spider):
        # 写sql语句 插数据，没有表的话要先在数据库创建
        sql = self.get_sql(item)
        if self.member:
            sql_md5 = self.redis.get_md5(sql)
            if not self.redis.redis_exists(self.member, sql_md5):
                # 创建游标对象
                self.cursor = self.conn.cursor()
                # 提交事务
                try:
                    self.cursor.execute(sql)
                    self.conn.commit()
                    self.redis.save_redis(self.member, sql_md5)
                    # int(conn.insert_id())  # 最新插入行的主键ID，conn.insert_id()一定要在conn.commit()之前，否则会返回0
                except Exception as e:
                    print(e)
                    print('异常回滚')
                    self.conn.rollback()

                self.cursor.close()
                return item
            else:
                print('已有相同数据无需插入')
        else:
            # 创建游标对象
            self.cursor = self.conn.cursor()
            # 提交事务
            try:
                self.cursor.execute(sql)
                self.conn.commit()
            except Exception as e:
                print(e)
                print('异常回滚')
                self.conn.rollback()
            self.cursor.close()
            return item

    def close_spider(self, spider):
        print('爬虫结束, 关闭通道')
        self.conn.close()
