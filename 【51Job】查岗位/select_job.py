# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-15  Python: 3.7

import requests
from lxml import etree

Format_str = 'https://search.51job.com/list/000000,000000,0000,00,9,99,{key},2,1.html?lang=c&stype=&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&providesalary=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare='
Headers = {
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
}


class GetJob(object):

    def __init__(self, job_name):
        self.job = job_name

        self.get_info()

    def get_info(self):
        target_url = Format_str.format(key=self.job)
        response = requests.get(target_url, headers=Headers)
        # 编码转换
        response.encoding = response.apparent_encoding
        root = etree.HTML(response.text)
        self.parse(root)

    @staticmethod
    def parse(root):
        div_list = root.xpath("//div[@class='dw_table']/div[@class='el']")
        for div in div_list:
            money = div.xpath("span[@class='t4']/text()")
            money = money[0] if money else "面议"
            # 工作名称不可能为空,所以不用判断
            a = div.xpath("p/span/a")[0]
            job_name = a.xpath("text()")[0].strip()
            job_href = a.xpath("@href")[0]
            date_time = div.xpath("span[@class='t5']/text()")
            date_time = date_time[0] if date_time else "没有时间"
            print(job_name, money, date_time, job_href)
            with open('job.csv', 'a', encoding='gb18030') as f:
                job_list = [job_name, date_time, money, job_href, '\n']
                f.write(','.join(job_list))


if __name__ == "__main__":
    key = input("请输入关键词")
    GetJob(key)
