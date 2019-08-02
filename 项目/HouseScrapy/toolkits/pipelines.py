# -*- coding: utf-8 -*-

from pymongo import MongoClient
from bson.objectid import ObjectId
from settings import MONGODB_URL, MONGODB_DB, MONGODB_COLL


class HousePipeline(object):
    """地产基础数据
    """

    def __init__(self):
        client = MongoClient(MONGODB_URL)
        self.coll = client[MONGODB_DB][MONGODB_COLL]  # 地产链接

    def process_item(self, item, spider):
        self.coll.insert_one(item['data'])
