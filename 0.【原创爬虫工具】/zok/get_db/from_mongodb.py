# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-23  Python: 3.7
from pymongo import MongoClient

from zok.zok_config import MONGODB_URL

client = MongoClient(MONGODB_URL)

database = client.meituan_db  # 链接数据库
collection = database.href_coolections  # 链接结合

data = collection.find({},{'_id': 0})
