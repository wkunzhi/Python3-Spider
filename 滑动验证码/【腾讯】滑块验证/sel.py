# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-10-28  Python: 3.7

import requests
import time
import cv2 as cv
import random
from selenium.webdriver import ActionChains
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC  # 显性等待
from selenium.webdriver.common.by import By


class TX:
    def __init__(self):
        # 初始化
        profile = webdriver.FirefoxOptions()  # 配置无头
        profile.add_argument('-headless')
        self.browser = webdriver.Firefox()
        wait = WebDriverWait(self.browser, 10)
        self.api_url = ''

    def end(self):
        self.browser.quit()

    def tx_code(self):
        WebDriverWait(self.browser, 20, 0.5).until(EC.presence_of_element_located((By.ID, 'tcaptcha_iframe')))  # 等待 iframe
        self.browser.switch_to.frame(self.browser.find_element_by_id('tcaptcha_iframe'))  # 加载 iframe
        time.sleep(0.5)
        bk_block = self.browser.find_element_by_xpath('//img[@id="slideBg"]').get_attribute('src')
        print(bk_block)
        if self.save_img(bk_block):
            dex = self.get_pos()
            track_list = self.get_track(dex)

            slid_ing = self.browser.find_element_by_xpath('//div[@id="tcaptcha_drag_thumb"]')  # 滑块定位
            ActionChains(self.browser).click_and_hold(on_element=slid_ing).perform()  # 鼠标按下
            time.sleep(0.2)
            print('轨迹', track_list)
            for track in track_list:
                ActionChains(self.browser).move_by_offset(xoffset=track, yoffset=0).perform()  # 鼠标移动到距离当前位置（x,y）
            time.sleep(1)
            ActionChains(self.browser).release(on_element=slid_ing).perform()  # print('第三步,释放鼠标')
            time.sleep(1)
            # 识别图片
            return True
        else:
            print('缺口图片捕获失败')
            return False

    @staticmethod
    def save_img(bk_block):
        """保存图片"""
        try:
            img = requests.get(bk_block).content
            with open('bg.jpeg', 'wb') as f:
                f.write(img)
            return True
        except:
            return False

    @staticmethod
    def get_pos():
        """识别缺口
        注意：网页上显示的图片为缩放图片，缩放 50% 所以识别坐标需要 0.5
        """
        image = cv.imread('bg.jpeg')
        blurred = cv.GaussianBlur(image, (5, 5), 0)
        canny = cv.Canny(blurred, 200, 400)
        contours, hierarchy = cv.findContours(canny, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
        for i, contour in enumerate(contours):
            m = cv.moments(contour)
            if m['m00'] == 0:
                cx = cy = 0
            else:
                cx, cy = m['m10'] / m['m00'], m['m01'] / m['m00']
            if 6000 < cv.contourArea(contour) < 8000 and 370 < cv.arcLength(contour, True) < 390:
                if cx < 400:
                    continue
                x, y, w, h = cv.boundingRect(contour)  # 外接矩形
                cv.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
                # cv.imshow('image', image)  # 显示识别结果
                print('【缺口识别】 {x}px'.format(x=x/2))
                return x/2
        return 0

    @staticmethod
    def get_track(distance):
        """模拟轨迹
        """
        distance -= 37  # 初始位置
        # 初速度
        v = 0
        # 单位时间为0.2s来统计轨迹，轨迹即0.2内的位移
        t = 0.9
        # 位移/轨迹列表，列表内的一个元素代表0.2s的位移
        tracks = []
        # 当前的位移
        current = 0
        # 到达mid值开始减速
        mid = distance * 7 / 8

        distance += 10  # 先滑过一点，最后再反着滑动回来
        # a = random.randint(1,3)
        while current < distance:
            if current < mid:
                # 加速度越小，单位时间的位移越小,模拟的轨迹就越多越详细
                a = random.randint(2, 4)  # 加速运动
            else:
                a = -random.randint(3, 5)  # 减速运动

            # 初速度
            v0 = v
            # 0.2秒时间内的位移
            s = v0 * t + 0.5 * a * (t ** 2)
            # 当前的位置
            current += s
            # 添加到轨迹列表
            tracks.append(round(s))

            # 速度已经达到v,该速度作为下次的初速度
            v = v0 + a * t

        # 反着滑动到大概准确位置
        for i in range(4):
            tracks.append(-random.randint(2, 3))
        for i in range(4):
            tracks.append(-random.randint(1, 3))
        return tracks

    def move_to(self, index):
        """滑动滑块"""
        pass

    def re_start(self):
        self.tx_code()
        self.end()


if __name__ == '__main__':
    xbt = TX()
    xbt.re_start()
