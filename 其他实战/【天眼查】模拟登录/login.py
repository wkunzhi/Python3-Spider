# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-13  Python: 3.7
import time

from lxml import etree
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TYC_Spider:

    def __init__(self, username, password):
        """初始化参数"""
        url = 'https://www.tianyancha.com/login'
        page_url = 'https://www.tianyancha.com/search/ohp1/p{page}?base=cq'
        self.page_url = page_url
        self.page = 1  # 当前页数
        self.url = url

        options = webdriver.ChromeOptions()
        # 不加载图片,加快访问速度
        # options.add_experimental_option("prefs", {"profile.managed_default_content_settings.images": 2})
        # 设置为开发者模式，避免被识别
        options.add_experimental_option('excludeSwitches',
                                        ['enable-automation'])
        self.browser = webdriver.Chrome(executable_path='./chromedriver', options=options)
        self.wait = WebDriverWait(self.browser, 40)
        # 初始化用户名
        self.username = username
        # 初始化密码
        self.password = password

    def run(self):
        """登陆接口"""
        self.browser.get(self.url)
        try:
            use_pass = self.wait.until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="web-content"]/div/div[2]/div/div[2]/div/div[3]/div[1]/div[2]')))
            time.sleep(2)
            use_pass.click()
            username = self.wait.until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="web-content"]/div/div[2]/div/div[2]/div/div[3]/div[2]/div[2]/input')))
            password = self.wait.until(
                EC.presence_of_element_located(
                    (By.XPATH, '//*[@id="web-content"]/div/div[2]/div/div[2]/div/div[3]/div[2]/div[3]/input')))
            input_to = self.wait.until(
                EC.presence_of_element_located(
                    (By.XPATH, '//*[@id="web-content"]/div/div[2]/div/div[2]/div/div[3]/div[2]/div[5]')))
            username.send_keys(self.username)
            password.send_keys(self.password)
            input_to.click()

            self.wait.until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="home-main-search"]')))
            print('登陆成功')
            self.go_page()

        except Exception:
            self.browser.close()
            print("登陆失败")

    def go_page(self):
        """进入指定页面"""
        self.browser.get(self.page_url.format(page=str(self.page+1)))  # ohp带电话
        self.get_info()
        self.go_page()

    def get_info(self):
        """获取当前页面，企业名称+电话号码"""
        html = self.browser.page_source
        etr = etree.HTML(html)
        divs = etr.xpath("//div[@class='search-item sv-search-company']")
        for div in divs:
            title = div.xpath('./div/div[3]/div[1]/a/text()')
            phone = div.xpath('./div/div[3]/div[3]/div[1]/script/text()')
            if not phone:
                phone = div.xpath('./div/div[3]/div[3]/div[1]/span[2]/span/text()')

            if not phone:
                phone = div.xpath('./div/div[3]/div[4]/div[1]/script/text()')
            print(title, phone)
        time.sleep(2)


if __name__ == "__main__":
    name = input("请输入你的微博用户名:")
    pas = input("请输入密码:")
    spider = TYC_Spider(name, pas)
    spider.run()
