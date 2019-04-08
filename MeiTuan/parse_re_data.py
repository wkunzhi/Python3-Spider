# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-08  Python: 3.7

import re

with open('text.html', 'r', encoding='utf-8') as f:
    data = f.read()

info_data = re.search(r'<div class="breadcrumbs">(.*?)<div><h3>商家团购及优惠', data).group(1)

"""店铺基本信息"""
node = re.findall(r'</span><span><a.*?/">(.*?)美食</a>.*?">(.*?)</a>', info_data)
print(node)
title = re.search(r'<!-- react-text: 26 -->(.*?)<!-- /react-text -->', info_data).group(1)
print(title)
score = re.search(r'<!-- react-text: 52 -->(.*?)<!-- /react-text -->', info_data).group(1)
print(score + '分')
price = re.search(r'<!-- react-text: 56 -->(.*?)<!-- /react-text -->', info_data).group(1)
print(price + '元')
address = re.search(r'<!-- react-text: 60 -->(.*?)<!-- /react-text -->', info_data).group(1)
print('地址：' + address)
phone = re.search(r'<!-- react-text: 64 -->(.*?)<!-- /react-text -->', info_data).group(1)
print('电话：' + phone)
open_time = re.search(r'<!-- react-text: 67 -->(.*?)<!-- /react-text -->', info_data).group(1)
print('营业时间：' + open_time)
master_image = re.findall(r';"><img src="(.*?)@.*?"', info_data)
# 处理图片水印, 第一张为主图logo，其余为环境图
print(master_image)

"""推荐菜"""
node = re.findall(r'","name":"(.*?)","price":(\d+),"frontImgUrl":"(.*?)"}',
                  re.search(r'window.appConfig(.*?)crumbNav', data).group(1))
print(node)

"""评论区内容"""
# 评论星数原理，两层星星图标，下层为灰色，上层覆盖点亮，通过控制上层宽度控制星数
# 67.2 = 4星  50.400000000000006=3星 84=5星  33.6=2星  16.8 =1星
star = {
    '16.8': 1,
    '33.6': 2,
    '50.400000000000006': 3,
    '67.2': 4,
    '84': 5,
}

content = re.search(r'</div><div class="comment">(.*?)</div></div></div><div class="btm-right">', data,
                    flags=re.DOTALL).group(1)
tags = re.findall(r'<li class=""><!--.*?-->(.*?)<!--.*?-->\((\d+)\)<!--.*?</li>', content)
print(tags)

desc = re.findall(
    r'<div class="name">(.*?)</div><div class="date"><span>(.*?)</span>.*?stars-light" style="width: (.*?)px;"><li>.*?<div class="desc">(.*?)</div>',
    content, flags=re.DOTALL)
for i in desc:
    i = list(i)
    i[2] = star.get(i[2])
    print(i)

