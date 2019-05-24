# -*- coding: utf-8 -*-

import pymysql

from MeiTuanArea.settings import MYSQL_DB_NAME, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER


class AreaPipeline(object):
    """区域采集"""
    conn = None
    cursor = None  # 游标对象

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
        sql = None
        if item['type'] == 'province':  # 一级 省市
            sql = """INSERT INTO province(id, `name`, pinyin, `first`) VALUES ("{id}","{name}","{pinyin}","{first}") """.format(
                id=int(item['id']),
                name=item['name'],
                pinyin=item['pinyin'],
                first=item['first'],
            )

        elif item['type'] == 'city':  # 二级 市
            sql = """INSERT INTO city(id,pid, `name`, pinyin, `first`) VALUES ("{id}","{pid}","{name}","{pinyin}","{first}") """.format(
                id=int(item['id']),
                pid=int(item['pid']),
                name=item['name'],
                pinyin=item['pinyin'],
                first=item['first'],
            )

        elif item['type'] == 'area':  # 三级 区域
            sql = """INSERT INTO area(id,pid, `name`, pinyin, `first`, haschild) VALUES ("{id}","{pid}","{name}","{pinyin}","{first}","{haschild}") """.format(
                id=int(item['id']),
                pid=int(item['pid']),
                name=item['name'],
                pinyin=item['pinyin'],
                first=item['first'],
                haschild=item['haschild'],
            )

        elif item['type'] == 'address':  # 四季 地区
            sql = """INSERT INTO address(id,pid, `name`, pinyin, `first`) VALUES ("{id}","{pid}","{name}","{pinyin}","{first}") """.format(
                id=int(item['id']),
                pid=int(item['pid']),
                name=item['name'],
                pinyin=item['pinyin'],
                first=item['first'],
            )

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


class CoordPipeline(object):
    """坐标采集更新"""
    conn = None
    cursor = None  # 游标对象

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
        sql = None
        if item['type'] == 'province':  # 一级 省市
            sql = """UPDATE province SET lng={lng}, lat={lat} where id={id}""".format(
                id=int(item['id']),
                lng=item['lng'],
                lat=item['lat'],
            )

        elif item['type'] == 'city':  # 二级 市
            sql = """UPDATE city SET lng={lng}, lat={lat} where id={id}""".format(
                id=int(item['id']),
                lng=item['lng'],
                lat=item['lat'],
            )

        elif item['type'] == 'area':  # 三级 区域
            sql = """UPDATE area SET lng={lng}, lat={lat} where id={id}""".format(
                id=int(item['id']),
                lng=item['lng'],
                lat=item['lat'],
            )

        elif item['type'] == 'address':  # 四季 地区
            sql = """UPDATE address SET lng={lng}, lat={lat} where id={id}""".format(
                id=int(item['id']),
                lng=item['lng'],
                lat=item['lat'],
            )

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
