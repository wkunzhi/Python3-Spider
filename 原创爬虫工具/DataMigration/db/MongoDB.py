# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-15  Python: 3.7
from pymongo import MongoClient

from DataMigration.config import MONGODB_URL


class Mongo(object):
    def __init__(self, db_name, collection):
        client = MongoClient(MONGODB_URL)
        database = client[db_name]
        self.collection = database[collection]

    def delete(self, *args, del_one=True):
        """
        删除复合条件的信息
        :param sql: sql 语句
        :param del_one: 默认删除第一条，否则删除复合条件的所有
        :return:
        """
        return self.collection.delete_one(*args) if del_one else self.collection.deleteMany(*args)

    @property
    def all(self):
        """
        返回全部
        :return: 整表信息
        """
        return self.collection.find({})

    def find(self, *args):
        """
        指定查找
        :param sql:
        :return:
        """
        return self.collection.find(*args)

    def update(self, *args, update_one=True):
        """
        修改数据
        :param sql: 修改sql
        :param update_one: 默认修改第一个，否则修改复合条件所有
        :return:
        """
        return self.collection.update_one(*args) if update_one else self.collection.update_many(*args)

    def insert(self, *args, insert_one=True):
        """
        插入数据
        :param sql: 新增sql
        :param insert_one: 默认插入一个
        :return:
        """
        return self.collection.insert_one(*args) if insert_one else self.collection.insert_many(*args)


if __name__ == '__main__':
    # 测试
    mg = Mongo('meituan', 'user_info')
    # data = mg.all
    ret = mg.update({'用户名': '三丰948'}, {'$set': {'用户名': '三三风'}})
