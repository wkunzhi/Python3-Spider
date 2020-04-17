import requests
import json
import re
import execjs.runtime_names


class People:
    def __init__(self, user, pwd):
        """
        初始化
        :param user: 用户名
        :param pwd: 密码
        """
        self.username = user
        self.pwd = pwd
        self.ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        self.headers = {
            'User-Agent': self.ua,
            'Host': 'www.renren.com',
        }
        self.session = requests.session()
        self.json_data = ''

        print('【JS引擎】', execjs.get().name)
        with open("enc.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def to_index(self):
        """
        第一步 - 访问首页
        获取 Cookies
        :return:
        """
        response = self.session.get('http://www.renren.com/', headers=self.headers)
        print('【主页】', response)

    def get_key(self):
        """
        第二步 - 获取加密参数
        获取 rkey 以及 密码加密所需参数
        :return:
        """
        headers = {
            'Referer': 'http://login.renren.com/ajaxproxy.htm',
            'User-Agent': self.ua,
        }
        response = self.session.get('http://login.renren.com/ajax/getEncryptKey', headers=headers)
        print('【获取key】', response.text)
        return response.text

    def login(self, key_info):
        """
        第三步 - 登录账号
        :param key_info: 第二步获取的参数
        :return:
        """
        url = 'http://www.renren.com/ajaxLogin/login?1=1' + self.js.call('getTime')
        data = {
            'email': self.username,
            'icode': "",
            'origURL': 'http://www.renren.com/home',
            'domain': 'renren.com',
            'key_id': '1',
            'captcha_type': 'web_login',
            'password': self.get_password(key_info),
            'rkey': json.loads(key_info).get('rkey'),
            'f': ''
        }
        print('【登录data】', data)
        print('【登录URL】', url)
        print('【Cookies】', self.session.cookies)
        response = self.session.post(url, data=data, headers=self.headers)
        print('【返回信息】', response.text)
        response = self.session.get('http://www.renren.com/home', headers=self.headers)
        print('【登录信息】', re.findall("<title>(.*?)</title>", response.text))

    def get_password(self, key_info):
        """
        调用 js 代码生成参数
        :param key_info:
        :return:
        """
        return self.js.call('enc', key_info, self.pwd)

    def start(self):
        """
        启动
        :return:
        """
        self.to_index()
        self.login(self.get_key())


if __name__ == '__main__':
    """
    启动区域
    """
    username = input('用户名>>> ')
    password = input('密码>>> ')
    pp = People(username, password)
    pp.start()
