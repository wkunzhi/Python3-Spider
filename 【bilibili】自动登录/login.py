#! /usr/bin/env python
# -*- coding: utf-8 -*-
# Date: 2020/4/23

import time
import base64
import random

from io import BytesIO
from PIL import Image

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec


BROWSER_EXECUTABLE_PATH = "/Users/liuzhichao/PycharmProjects/bilibili/chromedriver"


class LoginBli:

    # 登录URI
    login_url = "https://passport.bilibili.com/login"

    def __init__(self, username, password):
        """初始化

        Parameters
        ----------
        username: string
            B站账号

        password: string
            B站密码

        """
        self.username = username
        self.password = password
        # 定义浏览器
        self.browser = webdriver.Chrome(executable_path=BROWSER_EXECUTABLE_PATH)
        # 定义显示等待
        self.wait = WebDriverWait(self.browser, 20)

    def open(self):
        """模拟点击登陆

        自动打开浏览器, 进入登陆界面
        输入用户名, 密码
        """
        # 打开浏览器, 进入登陆界面
        self.browser.get(self.login_url)

        # 用户名输入框
        self.wait.until(
            ec.presence_of_element_located((By.ID, 'login-username'))
        ).send_keys(self.username)
        # 清空用户名输入框

        # 密码输入框
        self.wait.until(
            ec.presence_of_element_located((By.ID, 'login-passwd'))
        ).send_keys(self.password)
        # 清空密码输入框

        # 登录按钮
        login_button = self.wait.until(
            ec.presence_of_element_located((By.XPATH, '//*[@id="geetest-wrap"]/div/div[5]/a[1]'))
        )
        # 点击登录
        login_button.click()
        # 防止因网络波动，图片加载过慢，等待加载出来
        time.sleep(2)

    def get_geetest_image(self):
        """
        获取极验验证码图片

        """
        image_name = ["geetest_canvas_fullbg", "geetest_canvas_bg"]
        image = []
        for index in range(0, 2):
            # 执行js 拿到canvas画布里面的图片数据
            js = f'return document.getElementsByClassName("{image_name[index]}")[0].toDataURL("image/png");'
            # 图片数据
            complete_img_data = self.browser.execute_script(js)
            # base64 编码的图片信息
            complete_img_base64 = complete_img_data.split(',')[1]
            # 转成bytes类型
            complete_img = base64.b64decode(complete_img_base64)
            # 加载图片 return 回去对比
            image_c = Image.open(BytesIO(complete_img))
            image_c.save(f'image{index + 1}.png')
            image.append(image_c)

        return image

    def is_pixel_similar(self, image1, image2, x, y):
        """比较两张图片的像素点

        注意：像素点比较是有偏差的，需要允许一定范围的误差，我们可以设置一个阈值

        """
        # 获取两张图片执行位置的像素点
        c_pixel = image1.load()[x, y]
        ic_pixel = image2.load()[x, y]
        # 阈值 允许误差
        threshold = 10
        # 对比
        if abs(c_pixel[0] - ic_pixel[0]) < threshold and \
                abs(c_pixel[1] - ic_pixel[1]) < threshold and \
                abs(c_pixel[2] - ic_pixel[2]) < threshold:
            return True
        return False

    def get_slice_gap(self, image1, image2):
        """获取缺口的偏移量

        通过比较两张图片的所有像素点, 获取两张图片是从哪里开始不同
        从而得到 移动块 要在 x 方向移动的距离

        返回 缺口的偏移量

        Parameters
        ----------
        image1: Image instance
            完整的图片

        image2: Image instance
            有缺失的图片

        Returns
        ---------
        int
        """
        # image2.size:['width', 'height']
        for x in range(image1.size[0]):
            for y in range(image1.size[1]):
                if not self.is_pixel_similar(image1, image2, x, y):
                    # 移动块只在水平方向移动 只需返回 x
                    return x

    def get_track(self, distance):
        """根据偏移量获取移动轨迹

        返回 移动轨迹

        Parameters
        ----------
        distance: int
            偏移量

        Returns
        ---------
        int
        """
        # 移动轨迹
        track = []
        # 当前位移
        current = 0
        # 减速阈值

        mid = distance * 4 / 5
        # 计算间隔
        t = 0.2
        # 初速度
        v = 0

        while current < distance:
            if current < mid:
                # 加速度为正2
                a = 20
            else:
                # 加速度为负3
                a = -30
            # 初速度v0
            v0 = v
            # 当前速度v = v0 + at
            v = v0 + a * t
            # 移动距离x = v0t + 1/2 * a * t^2
            move = v0 * t + 1 / 2 * a * t * t
            # 当前位移
            current += move
            # 加入轨迹
            track.append(round(move))
        return track

    def move_to_gap(self, slider, tracks):
        """模拟人工将滑块到缺口处

        Parameters
        ----------
        slider: Any
            滑块

        tracks: Any
            轨迹

        """
        ActionChains(self.browser).click_and_hold(slider).perform()
        for x in tracks:
            ActionChains(self.browser).move_by_offset(xoffset=x, yoffset=0).perform()
        time.sleep(random.random())
        ActionChains(self.browser).release().perform()

    def get_geetest_button(self):
        """获取初始验证按钮
        """
        return self.wait.until(ec.element_to_be_clickable((By.CLASS_NAME, 'geetest_slider_button')))

    def login_success(self):
        """判定是否登录成功

        响应一个布尔值

        Returns
        ----------
        bool
        """
        try:
            # 登录成功后 界面上会有一个消息按钮
            return bool(
                WebDriverWait(self.browser, 5).until(ec.presence_of_element_located(
                    (By.XPATH, '//a[@href="//message.bilibili.com/new"]'))
                )
            )
        except Exception as exc:
            print(exc)
            return False

    def login(self):
        """开始

        """

        # 打开浏览器, 输入账号 密码, 点击登陆
        self.open()
        # 获取验证图 image2(有缺失的验证图) image1(完整的验证图)
        image1, image2 = self.get_geetest_image()

        # 获取缺口的偏移量
        gap = self.get_slice_gap(image1, image2)

        print(f'缺口的偏移量为：{gap}')
        # 拖动滑块 有误差-8
        track = self.get_track(gap - 12)
        slider = self.get_geetest_button()
        self.move_to_gap(slider, track)
        time.sleep(3)

        if self.login_success():
            print('登陆成功，获取 cookie 成功 ~ ')
            cookies = {cookie["name"]: cookie["value"] for cookie in self.browser.get_cookies()}
            print(cookies)
        else:
            self.login()


if __name__ == '__main__':
    account = input("请输入B站账号 >>>")
    pwd = input("请输入B站密码 >>>")

    instance = LoginBli(account, pwd)
    instance.login()
