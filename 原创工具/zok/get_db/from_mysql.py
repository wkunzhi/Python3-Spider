# -*- coding: utf-8 -*-
# __author__ = "zok"
# Date: 2019/3/7  Python: 3.7

import pymysql

from zok.zok_config import *


def get_data(sql):
    conn = pymysql.Connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        db=MYSQL_DB_NAME,
    )
    # 创建游标对象
    cursor = conn.cursor()
    # 提交事务
    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        cursor.close()
        conn.close()
        return data
    except Exception as e:
        print(e)
        print('异常回滚')
        conn.rollback()
        cursor.close()
        conn.close()
        return None

