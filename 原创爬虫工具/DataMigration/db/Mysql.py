# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-15  Python: 3.7
import pymysql

from DataMigration.config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME


class Mysql(object):
    def __init__(self):
        """
        链接数据库
        """
        self.conn = pymysql.Connect(
            host=MYSQL_HOST,
            port=MYSQL_PORT,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            db=MYSQL_DB_NAME,
        )

    def insert(self, sql):
        """
        查找
        :param sql: sql语句
        :return:
        """
        # 创建游标对象
        cursor = self.conn.cursor()
        # 执行并提交
        try:
            cursor.execute(sql)
            self.conn.commit()
        except Exception as e:
            print('异常回滚')
            self.conn.rollback()
        finally:
            cursor.close()

    def select(self, sql):
        """
        查找
        :param sql: sql 语句
        :return: 查找结果
        """
        cursor = self.conn.cursor()  # 创建游标对象
        # 提交事务
        try:
            cursor.execute(sql)
            data = cursor.fetchall()
        except Exception as e:
            print('异常回滚')
            data = None
            self.conn.rollback()
        finally:
            cursor.close()
        return data

