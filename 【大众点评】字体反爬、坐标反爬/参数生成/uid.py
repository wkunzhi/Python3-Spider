# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-11-15  Python: 3.7
import execjs.runtime_names
import random
from faker import Faker

info = random.choice([[800, 1024], [900, 1440], [1050, 1680], [1200, 1920], [1200, 1600]])

with open("encryp.js", "r", encoding="utf-8") as f:
    js = execjs.compile(f.read())

print('引擎', execjs.get().name)
uid = js.call('test', Faker().user_agent(), info[0], info[1])
print(uid)
