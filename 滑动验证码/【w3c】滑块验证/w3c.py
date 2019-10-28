# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-10-10  Python: 3.7

import requests
import re
import json
from PIL import Image  # 图像处理模块
from io import BytesIO  # io 加载


class W3C:
    """
    滑块验证码识别与破解

    w3c 网站滑块网址 https://www.w3cschool.cn/register
    """

    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
            'Host': 'www.w3cschool.cn'
        }
        self.local = 'https://www.w3cschool.cn'
        self.check = 'https://www.w3cschool.cn/dragcheck'
        self.session = requests.session()
        self.height = 58  # 碎片高
        self.width = 13  # 碎片宽

    def get_img(self):
        """获取页面滑块图片"""
        response = self.session.get('https://www.w3cschool.cn/register', headers=self.headers)
        results = re.findall(r'background-image: url\("(.*?)"\);', response.text)
        bg_img = self.local + results[0]  # 背景图
        hk_img = self.local + results[1]  # 滑块图
        # print(bg_img, hk_img)
        # 取 css
        css_list = re.findall(r'background-position:(.*?);">', response.text)

        # 缺口滑块
        ret = self.session.get(hk_img)
        with open('hk.png', 'wb') as f:
            f.write(ret.content)

        # 图片对象
        img_cha = self.split_img(bg_img, css_list)
        xy = None  # 识别结果
        for n in range(4):
            full_image = Image.open('img/'+str(n)+'.png')
            # 获取缺口位置
            xy = self.get_distance(img_cha, full_image)
            if xy and xy > 0:
                break

        return xy

    def get_distance(self, bg_image, full_image):
        """
        计算滑块移动距离
        :param bg_image: (Image) 有缺口的整图
        :param full_image: (Image) 完整原图
        :return: (Int)缺口离滑块的距离
        """

        # 滑块的初始位置
        distance = 0
        # 遍历像素点横坐标
        for i in range(distance, full_image.size[0]):
            # 遍历像素点纵坐标
            for j in range(full_image.size[1]):
                # 如果不是相同像素
                if not self.is_pixel_equal(bg_image, full_image, i, j):
                    # 返回此时横轴坐标就是滑块需要移动的距离
                    return i

    @staticmethod
    def is_pixel_equal(bg_image, full_image, x, y):
        """
        判断像素是否相同算法
        :param bg_image: (Image)缺口图片
        :param full_image: (Image)完整图片
        :param x: (Int)位置x
        :param y: (Int)位置y
        :return: (Boolean)像素是否相同
        """
        # 获取缺口图片的像素点(按照RGB格式)
        bg_pixel = bg_image.load()[x, y]
        # 获取完整图片的像素点(按照RGB格式)
        full_pixel = full_image.load()[x, y]
        # 设置一个判定值，像素值之差超过判定值则认为该像素不相同
        threshold = 1  # 可根据识别效果调整
        # 判断像素的各个颜色之差，abs()用于取绝对值
        if (abs(bg_pixel[0] - full_pixel[0] < threshold) and abs(bg_pixel[1] - full_pixel[1] < threshold) and abs(
                bg_pixel[2] - full_pixel[2] < threshold)):
            # 如果差值在判断值之内，返回是相同像素
            return True
        else:
            # 如果差值在判断值之外，返回不是相同像素
            return False

    def split_img(self, bg_img, css_list):
        """图片还原"""
        # 背景
        ret = self.session.get(bg_img)
        bytes_io = BytesIO()
        bytes_io.write(ret.content)
        img = Image.open(bytes_io)
        img_cha = Image.open('chache.png')
        img.save('bg.png')   # 记录一下原始图片

        for index, i in enumerate(css_list):
            x, y = [abs(int(xy[:-2])) for xy in i.split(' ')]  # 将 css 坐标抽离出来
            box = [x, y, x + self.width, y + self.height]
            im_crop = img.crop(box)
            if index < 20:  # 第一行
                img_cha.paste(im_crop, (index*self.width, 0))
            else:  # 第二行
                img_cha.paste(im_crop, ((index-20)*self.width, self.height))
        img_cha.save('chache.png')  # 储存
        return img_cha

    def check_code(self):
        """滑块认证"""
        point = self.get_img()

        if point:
            print('\033[1;34m识别成功: 缺口位置 x: %s \033[0m' % point)
            print('\033[1;36m提交数据中...\033[0m')
            result = self.session.post(self.check, data={'point': point}, headers=self.headers)
            print(json.loads(result.text).get('message'))
        else:
            print('滑块识别失败。。运气不佳。。重试即可。')


if __name__ == '__main__':
    wc = W3C()
    wc.check_code()
