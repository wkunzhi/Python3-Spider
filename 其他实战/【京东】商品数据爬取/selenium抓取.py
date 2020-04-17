# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-11  Python: 3.7

from selenium import webdriver
from selenium.webdriver.common.keys import Keys  # 键盘按键操作
import time


def get_goods(driver):
    try:
        goods = driver.find_elements_by_class_name('gl-item')

        for good in goods:
            detail_url = good.find_element_by_tag_name('a').get_attribute('href')

            p_name = good.find_element_by_css_selector('.p-name em').text.replace('\n', '')
            price = good.find_element_by_css_selector('.p-price i').text
            p_commit = good.find_element_by_css_selector('.p-commit a').text

            msg = '''
            商品 : %s
            链接 : %s
            价钱 ：%s
            评论 ：%s
            ''' % (p_name, detail_url, price, p_commit)

            print(msg, end='\n\n')

        button = driver.find_element_by_partial_link_text('下一页')
        button.click()
        time.sleep(1)
        get_goods(driver)
    except Exception:
        pass


def spider(url, keyword):
    driver = webdriver.Firefox()
    driver.get(url)
    driver.implicitly_wait(3)  # 使用隐式等待
    try:
        input_tag = driver.find_element_by_id('key')
        input_tag.send_keys(keyword)
        input_tag.send_keys(Keys.ENTER)
        get_goods(driver)
    finally:
        driver.close()


if __name__ == '__main__':
    spider('https://www.jd.com/', keyword='手机')
