# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-11-08  Python: 3.7
import requests
import json
import pandas as pd
import openpyxl
import jieba
import wordcloud
import matplotlib.pyplot as plt


class SSQ:
    def __init__(self, file, font):
        self.header = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36',
            'Host': 'www.cwl.gov.cn',
            'Referer': 'http://www.cwl.gov.cn/kjxx/ssq/kjgg/'
        }
        self.file = file
        self.font = font
        self.get_history_url = 'http://www.cwl.gov.cn/cwl_admin/kjxx/findDrawNotice?name=ssq&issueCount=100'
        self.session = requests.session()

    def history(self):
        """爬取最近100期"""
        _dict = None
        try:
            self.session.get('http://www.cwl.gov.cn/kjxx/ssq/kjgg/')
            _dict = json.loads(self.session.get(self.get_history_url, headers=self.header).text)
        except TypeError:
            print('获取历史记录失败')
        finally:
            return _dict

    def clean_data(self, data):
        """
        清洗数据
        :return:
        """
        columns = []

        for item in data.get('result'):
            columns.append([
                item.get('code'),
                item.get('date'),
                item.get('week'),
                item.get('red').split(','),
                item.get('blue'),
                item.get('sales'),
                item.get('poolmoney'),
                item.get('content'),
                item.get('prizegrades')[0].get('typemoney'),
                item.get('prizegrades')[0].get('typenum'),
                item.get('prizegrades')[1].get('typemoney'),
                item.get('prizegrades')[1].get('typenum'),
                item.get('prizegrades')[2].get('typemoney'),
                item.get('prizegrades')[2].get('typenum'),
            ])

        df = pd.DataFrame(
            columns,
            columns=["期数", "开奖日期", "星期数", "红球", "蓝球", "销售金额", "奖池", "中奖地区", "一等奖金", "一等奖人数", "二等奖金", "二等奖人数", "三等奖金", "三等奖人数"],  # 指定列
        )
        self.save(df)
        self.set_data(df)

    def save(self, df):
        """储存
        """
        df.to_excel(self.file)

    def set_data(self, df):
        """
        数据预处理
        :return:
        """
        cut_text = []
        for i in df['中奖地区']:
            for addr in i.split(',')[:-1]:
                name, num = jieba.cut(addr[:-1])
                for n in range(int(num)):
                    cut_text.append(name)
        print(" ".join(cut_text))

        w = wordcloud.WordCloud(font_path=self.font, background_color="white", scale=4)
        w.generate(" ".join(cut_text))
        plt.imshow(w, interpolation="bilinear")
        plt.axis("off")
        # plt.show()
        # 保存生成的图片
        w.to_file('result.jpg')

    def parse_history(self):
        """
        pandas 载入数据
        :return:
        """
        data = self.history()
        self.clean_data(data)


if __name__ == "__main__":
    """
    请自行准备一个字体文件并导入路径
    """
    ssq = SSQ('近期记录.xlsx', '你自己准备的字库路径')
    ssq.parse_history()
