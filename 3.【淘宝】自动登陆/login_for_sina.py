# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-11  Python: 3.7

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TB_Spider:

    def __init__(self, username, password):
        """初始化参数"""
        url = 'https://login.taobao.com/member/login.jhtml'
        self.url = url

        options = webdriver.ChromeOptions()
        # 不加载图片,加快访问速度
        options.add_experimental_option("prefs", {"profile.managed_default_content_settings.images": 2})
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
            # 这里设置等待：等待输入框
            login_element = self.wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '.qrcode-login > .login-links > .forget-pwd')))
            login_element.click()

            sina_login = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.weibo-login')))
            sina_login.click()

            weibo_user = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.username > .W_input')))
            weibo_user.send_keys(self.username)

            sina_password = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.password > .W_input')))
            sina_password.send_keys(self.password)

            submit = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.btn_tip > a > span')))
            submit.click()

            taobao_name = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,
                                                                          '.site-nav-bd > ul.site-nav-bd-l > li#J_SiteNavLogin > div.site-nav-menu-hd > div.site-nav-user > a.site-nav-login-info-nick ')))
            # 登陆成功打印提示信息
            print("登陆成功：%s" % taobao_name.text)
        except Exception:
            self.browser.close()
            print("登陆失败")


if __name__ == "__main__":
    name = input("请输入你的微博用户名:")
    pas = input("请输入密码:")
    spider = TB_Spider(name, pas)
    spider.run()
