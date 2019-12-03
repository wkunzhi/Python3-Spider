import requests
import json
import execjs.runtime_names


class People:
    def __init__(self, username, pwd):
        self.username = username
        self.pwd = pwd
        self.index_url = 'http://www.renren.com/'
        self.session = requests.session()
        print('引擎', execjs.get().name)
        with open("enc.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def to_html(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
            'Host': 'www.renren.com',
        }
        response = self.session.get(self.index_url, headers=headers)
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(response.text)
        print('第一次请求返回', response)

    def get_key(self):
        headers = {
            'Referer': 'http://login.renren.com/ajaxproxy.htm',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        }
        url = 'http://login.renren.com/ajax/getEncryptKey'
        response = self.session.get(url, headers=headers)
        _dict = json.loads(response.text)
        print('获取key返回数据', _dict)
        return _dict

    def login(self, _dict):
        url = 'http://www.renren.com/ajaxLogin/login?1=1' + self.js.call('getTime')
        data = {
            'email': self.username,
            'icode': '',
            'origURL': 'http://www.renren.com/home',
            'domain': 'renren.com',
            'key_id': '1',
            'captcha_type': 'web_login',
            'password':  self.get_password(_dict),
            'rkey': _dict.get('rkey')
        }
        headers = {
            'Host': 'www.renren.com',
            'Origin': 'http://www.renren.com',
            'Referer': 'http://www.renren.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        }
        print('登录data', data)
        print('登录URL', url)
        response = self.session.post(url, data=data, headers=headers)
        print(response.text)

    def get_password(self, _dict):
        return self.js.call('enc', _dict.get('e'), _dict.get('n'), self.pwd)

    def start(self):
        self.to_html()
        self.login(self.get_key())


if __name__ == '__main__':
    username = input('用户名 >>> ')
    password = input('密码 >>> ')
    pp = People(username, password)
    pp.start()
