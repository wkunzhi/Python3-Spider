# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-12-23  Python: 3.7

import requests
import re
import time
import random
import os
import sys
import execjs.runtime_names

from urllib import parse

sys.path.append(os.path.abspath(os.path.dirname(os.path.dirname(__file__))))

from header import *


class BaiDu:
    """
    百度找回密码
    """

    def __init__(self, username):
        print('引擎', execjs.get().name)
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())
        self.dv = ''
        self.username = username
        self.cookies = None

    def make_dv(self):
        """生成dv 参数
        """
        with open("dv.js", "r", encoding="utf-8") as f:
            js_dv = execjs.compile(f.read())
        _time = int(round(time.time() * 1000)) / 1000
        tk = "tk0.29" + str(random.randint(104771190122337, 904771190122337)) + str(_time * 1000)
        self.dv = js_dv.call('MakeDv', _time, tk)
        print('【生成dv】', self.dv)

    def get_bds_token(self):
        """
        第一次访问 取 bds_token
        :return: bds_token
        """
        response = requests.get('https://passport.baidu.com/?getpassindex', headers=headers_bds_token)
        text = response.content.decode('utf-8')
        bds_token = re.search(r'"bdstoken" value="(.*?)"', text).group(1)
        print("【bds_token】:", bds_token)
        self.cookies = response.cookies
        return bds_token

    def get_verify_str(self):
        """
        第二次访问 取 verify_str
        :return:
        """
        response = requests.get("https://passport.baidu.com/v2/?reggetcodestr&v=1574477016779&callback=bd__cbs__rgpbwl",
                                headers=headers_verify_str, cookies=self.cookies)
        text = response.content.decode('utf-8')
        verify_str = re.search(r"verifystr:'(.*?)'", text).group(1)
        print('【verifystr】:', verify_str)
        return verify_str

    def get_img(self, verify_str):
        """
        第三补 请求图片
        :return:
        """
        response = requests.get('https://passport.baidu.com/cgi-bin/genimage?' + verify_str, cookies=self.cookies,
                                headers=headers_img)
        with open('验证码.png', 'wb') as f:
            f.write(response.content)

    def get_token(self, bds_token, verify_str, code, _time, sig):
        """
        第四步 获取 Token
        :return:
        """
        data = {
            "username": self.username,
            "veritycode": code,
            "captcha_str": verify_str,
            "bdstoken": bds_token,
            "tpl": '',
            "index": 'username',
            "countrycode": '',
            "alg": 'v2',
            "time": _time,
            "sig": parse.quote(sig),
            "dv": self.dv,
        }
        response = requests.post('https://passport.baidu.com/?getpassindex', data=data, headers=headers_token,
                                 cookies=self.cookies)
        text = response.content.decode('utf-8')
        if '频繁' in text:
            print('【错误：操作频繁】')
        elif '验证码有误' in text:
            print('【错误：验证码输错】')
        else:
            token = re.search(r"token = '(.*?)';", text).group(1)
            token = token.replace('\\', '')
            if token:
                print('【token】：', token)
            else:
                print(text)
                print('【错误】token 加载失败')
                exit()
            return token

    def get_phone(self, token):
        """
        第五步 获取电话
        :return:
        """
        url = 'https://passport.baidu.com/v2/sapi/authwidgetverify?authtoken=' + parse.quote(
            token) + '&type=&jsonp=1&apiver=v3&verifychannel=&action=getapi&vcode=&questionAndAnswer=&needsid=&rsakey=&countrycode=&u=https%3A%2F%2Fpassport.qatest.baidu.com%2F%3Fgetpassresetpwd&tpl=&winsdk=&authAction=&callback=bd__cbs__oeq73u'
        response = requests.get(url, cookies=self.cookies, headers=headers_get_phone)
        text = response.content.decode("utf-8")
        if '系统繁忙' in text:
            print('【错误：系统繁忙】')
        else:
            result = re.search('mobile":\'(.*?)\'.*?email":\'(.*?)\'', text)
            print('电话:', result.group(1))
            print('邮箱:', result.group(2))
        print(response.text)

    def js_call(self, bds_token, verify_str, code):
        """
        运行js V8 获取参数
        :return: _time, sig
        """
        result = self.js.call('zh', bds_token, verify_str, self.dv, self.username, code)
        _time, sig = result.split('|')
        print("【time】：", _time)
        print("【sig】：", sig)
        return _time, sig

    def start(self):
        """
        启动
        :return:
        """
        code = None
        self.make_dv()  # dv 获取
        bds_token = self.get_bds_token()  # 1
        verify_str = self.get_verify_str()  # 2
        self.get_img(verify_str)

        code = input('请输入验证码 （验证码图在目录下）>>>>  ')
        print('【验证码】：', code)
        if code:
            # 账号处理
            _time, sig = self.js_call(bds_token, verify_str, code)  # 3
            token = self.get_token(bds_token, verify_str, code, _time, sig)  # 4
            self.get_phone(token)  # 5


if __name__ == '__main__':
    user = input('用户名')
    star = time.time()
    bd = BaiDu(user)
    bd.start()
    print('【执行时间】：', time.time() - star, '秒')
