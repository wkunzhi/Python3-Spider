# -*- coding: utf-8 -*-
import scrapy

from settings import HOST
from toolkits.items import HousesItem


class HouseSpider(scrapy.Spider):
    name = 'house'
    start_urls = ['http://www.funi.com/loupan/region_0_0_0_0_1']
    target_url = 'http://www.funi.com/loupan/region_0_0_0_0_{page}'

    custom_settings = {
        'ITEM_PIPELINES': {
            'toolkits.pipelines.HousePipeline': 300,
        },
        'DOWNLOADER_MIDDLEWARES': {
            'toolkits.proxies.ProxyMiddleware': 15,  # Proxy
            'toolkits.make_ua.RandomUserAgentMiddleware': 20,  # random UA
        },
    }

    def parse(self, response):
        """取总页数
        """
        total_page = response.xpath('//*[@class="fleft"]/div[3]/a[9]/text()').extract_first()
        try:
            for page in range(1, int(total_page)):
                url = self.target_url.format(page=page)
                yield scrapy.Request(url, callback=self.parse_url)
        except Exception:
            print('获取页数失败')

    def parse_url(self, response):
        """获取房产链接
        """
        # 获取并清洗链接
        a_list = response.xpath('//*[@class="fleft"]/div[2]/dl/dt/a')

        # 访问楼盘
        for a in a_list:
            href = a.xpath('./@href').extract_first()
            title = a.xpath('./@title').extract_first()
            url = HOST + href[:href.find(';')] if ';' in href else HOST + href

            # 获取基础信息
            yield scrapy.Request(url + '/detail.htm', callback=self.parse_base, meta={'name': title, 'base_url': url})

    def parse_base(self, response):
        """解析楼盘基础信息
        """

        dls = response.xpath('//*[@class="intro"]/dl')

        if len(dls) == 2:
            key_base = dls[0].xpath('./dd/ul/li/span/text()').extract()
            values_base = [node.strip() for node in dls[0].xpath('./dd/ul/li/em/text()').extract()]
            key_info = dls[1].xpath('./dd/ul/li/span/text()').extract()
            values_info = dls[1].xpath('./dd/ul/li/em/text()').extract()

            # 数据压缩
            data = dict(dict(zip(key_base, values_base)), **dict(zip(key_info, values_info)))

            # 提取传输数据
            data['楼盘名'] = response.meta.get('name')
            base_url = response.meta.get('base_url')

            # 获取 最新动态
            yield scrapy.Request(base_url + '/news.htm', callback=self.parse_news,
                                 meta={'base_url': base_url, 'data': data})

    def parse_news(self, response):
        """解析新闻
        """
        dls = response.xpath('//*[@class="tml_main"]/dl')

        news = []

        for dl in dls:
            number = dl.xpath('./dd/div/div[1]/b/i/text()').extract_first()
            ps = dl.xpath('./dd/div/div[2]/p')

            strong_info = dl.xpath('./dd/div/div[2]/p[1]/em/text()').extract()  # 预售
            new_info = dl.xpath('./dd/div/div[2]/ul/li/text()').extract()  # 最新动态

            # 组装数据
            info = {'商品房预售许可证': number}

            # 数组清洗
            for node in strong_info:  # 预售信息
                _str = node.split('：')
                if len(_str) == 2:
                    info[_str[0]] = _str[1]

            for node in new_info:  # 预售资质
                _str = node.split('：')
                if len(_str) == 2:
                    info[_str[0]] = _str[1]

            for index, p in enumerate(ps):  # 户数
                n = p.xpath('./text()').extract_first()
                if index == 1 or not n:
                    continue
                _str = n.split('：')
                if len(_str) == 2:
                    info[_str[0]] = _str[1]

            news.append(info)

        # 组装数据
        data = response.meta.get('data')
        data['最新动态'] = news
        base_url = response.meta.get('base_url')

        yield scrapy.Request(base_url, callback=self.parse_info, meta={'base_url': base_url, 'data': data})

    def parse_info(self, response):
        """小区基础数据
        """
        address = response.xpath('//*[@class="pro_info"]/p[2]/i/text()').extract_first()  # 楼盘地址
        company = response.xpath('//*[@class="pro_info"]/p[3]/i/text()').extract_first()  # 开发商
        tags = response.xpath('//*[@class="pro_info"]/p[4]/span/text()').extract()  # 标签
        phone = response.xpath('//*[@class="pro_info"]/p[5]/b/text()').extract_first()  # 售楼部电话
        open_time = response.xpath('//*[@class="pro_info"]/p[6]/i/text()').extract_first()  # 开盘时间
        house_type = response.xpath('//*[@class="pro_info"]/p[7]/i/text()').extract_first()  # 建筑类型
        number = response.xpath('//*[@class="pro_info"]/p[8]/i/text()').extract_first()  # 规划用户
        expense = response.xpath('//*[@class="pro_info"]/p[8]/i[2]/text()').extract_first()  # 物管费
        expense = expense.strip() if expense else ''
        phone = phone.strip() if phone else ''

        data = response.meta.get('data')
        data['楼盘地址'] = address
        data['开发商'] = company
        data['特色'] = tags
        data['售楼电话'] = phone
        data['开盘时间'] = open_time
        data['建筑类型'] = house_type
        data['规划户数'] = number
        data['物管费'] = expense
        data['网址'] = response.meta.get('base_url')

        item = HousesItem()
        item['data'] = data

        yield item
