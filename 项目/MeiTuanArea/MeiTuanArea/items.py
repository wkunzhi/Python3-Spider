# -*- coding: utf-8 -*-

import scrapy


class AreaItem(scrapy.Item):
    """地区"""
    type = scrapy.Field()
    id = scrapy.Field()
    pid = scrapy.Field()
    name = scrapy.Field()
    pinyin = scrapy.Field()
    first = scrapy.Field()
    haschild = scrapy.Field()


class CoordItem(scrapy.Item):
    """坐标录入"""
    type = scrapy.Field()
    id = scrapy.Field()
    lng = scrapy.Field()
    lat = scrapy.Field()
