# -*- coding: utf-8 -*-
# __author__ = "362416272@QQ.COM"
# Date: 2019/3/25  Python: 3.7.2

import re
from lxml import etree
from requests_html import HTMLSession


class DianPing(object):
    def __init__(self):
        # 此处以爬取第一页中的评论数为例
        self.stat_url = 'http://www.dianping.com/huizhou/ch10/g103'

    @staticmethod
    def parse_url(url):
        # 解析并返回页面内容
        session = HTMLSession()
        response = session.get(url)
        return response.content.decode()

    # 定义css的URL地址
    def get_css(self, html):
        svg_text_css = re.search(r'href="([^"]+svgtextcss[^"]+)"', html, re.M)
        if not svg_text_css:
            raise Exception("未找到链接")
        css_url = svg_text_css.group(1)
        content = self.parse_url('https:' + css_url)
        return content

    # 获取定义偏移量的css文件后将结果以字典形式存储
    @ staticmethod
    def get_css_offset(content_css):
        """
        通过传入页面中任意css获取其对应的偏移量
        :return: {'xxx': ['192', '1550']}
        """
        offset_item = re.findall(r'(\.[a-zA-Z0-9-]+)\{background:-(\d+).0px -(\d+).0px', content_css)
        result = {}
        for item in offset_item:
            css_class = item[0][1:]
            x_offset = item[1]
            y_offset = item[2]
            result[css_class] = [x_offset, y_offset]
        return result

    # 获取svg url组
    @staticmethod
    def get_svg_url_dict(content_css):
        items = re.findall(r'span\[class\^="(.*?)"\].*?width: (\d+)px;.*?background-image: url\((.*?)\);', content_css)
        result = {}
        for code, size, url in items:
            svg_list = [int(size), 'https:' + url]
            result[code] = svg_list
        return result

    # 根据偏移量找到对应的数字
    def parse_comment_css(self, svg_url, size, x_offset, y_offset):
        # print(size)  # 要用size做像素偏移，做裴勇
        svg_html = self.parse_url(svg_url)
        pattern = re.compile(r'y=.*?(\d+)">(\d+)</text>', re.S)
        items = re.findall(pattern, svg_html)
        svg_list = []
        for item in items:
            svg = {'y_key': int(item[0]), 'text': item[1]}
            svg_list.append(svg)
        x, y = int(x_offset), int(y_offset)
        if y <= svg_list[0]['y_key']:
            return svg_list[0]['text'][x // 12]
        elif y <= svg_list[1]['y_key']:
            return svg_list[1]['text'][x // 12]
        else:
            return svg_list[2]['text'][x // 12]

    # 获取点评数
    def get_comment_num(self):
        content = self.parse_url(self.stat_url)
        html = etree.HTML(content)
        shops = html.xpath('.//div[@id="shop-all-list"]/ul/li')  # 获取到所有店面
        content_css = self.get_css(content)
        css_class_dirt = self.get_css_offset(content_css)  # 偏移量字典存储
        svg_url_dict = self.get_svg_url_dict(content_css)  # svg的url dict储存
        for shop in shops:
            shop_name = shop.xpath('.//div[@class="tit"]/a/@title')[0]  # 获取店名
            review_num = shop.xpath('.//div[@class="comment"]/a[contains(@class,"review-num")]/b')[0]  # 获取可见的数字
            num = 0
            if review_num.text:
                # if 有可见字
                num = int(review_num.text)
            for review_node in review_num:
                """每个字符解密一次"""
                css_class = review_node.attrib["class"]  # 取css名
                # 根据css名称获取偏移量
                x_offset, y_offset = css_class_dirt[css_class][0], css_class_dirt[css_class][1]
                # 根据偏移量来找到对应的数字
                svg = svg_url_dict[css_class[:2]]
                if not svg:
                    svg = svg_url_dict[css_class[:3]]
                size = svg[0]
                svg_url = svg[1]
                new_num = self.parse_comment_css(svg_url, size, x_offset, y_offset)
                num = num * 10 + int(new_num)
            print("餐馆: {}, 点评数: {}".format(shop_name, num))


if __name__ == '__main__':
    dian_ping = DianPing()
    dian_ping.get_comment_num()
