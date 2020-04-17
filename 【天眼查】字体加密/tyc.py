# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-12-06  Python: 3.7

"""
    从网页下载一个字体文件获取对应推导式，动态获取请自行拓展
"""

from fontTools.ttLib import TTFont
import re

font = TTFont('num.woff')  # 打开tyc-num.woff
font.saveXML('tyc-num.xml')  # 保存为tyc-num.xml
with open('tyc-num.xml', 'r') as f:
    xml = f.read()  # 读取tyc-num.xml赋值给xml
GlyphID = re.findall(r'<GlyphID id="(.*?)" name="(\d+)"/>', xml)  # 获得对应关系
print(GlyphID)
GlyphIDNameLists = list(set([int(Gname) for Gid, Gname in GlyphID])) # 对应关系数量转换
print(GlyphIDNameLists)
DigitalDicts = {str(i): str(GlyphIDNameLists[i - 2]) for i in range(2, len(GlyphIDNameLists)+2)}  # 数字对应关系的字典推导式
print(DigitalDicts)
GlyphIDDicts = {str(Gname): DigitalDicts[Gid] for Gid, Gname in GlyphID}  # 通过数字对应关系生成源代码跟页面显示的字典推导式
print('-' * 39 + '数字对应关系的字典推导式' + '-' * 39)
print(DigitalDicts)
print('-' * 27 + '通过数字对应关系生成源代码跟页面显示的字典推导式' + '-' * 27)
print(GlyphIDDicts)
