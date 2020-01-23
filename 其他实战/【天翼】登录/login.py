# -*- encoding: utf-8 -*-
# Auth: Zok  Email: 362416272@qq.com
# Date: 2020/1/23


import requests
import re
import execjs


session = requests.session()
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'


def login(username, password):
    with open('v1.js', 'r', encoding='utf-8') as f:
        js = execjs.compile(f.read())
    username = js.call('make', username)
    password = js.call('make', password)
    url = 'https://e.189.cn/index.do'
    login_url = 'https://open.e.189.cn/api/logbox/oauth2/loginSubmit.do'
    response = session.get(url, headers={"User-Agent": UA})
    ret = re.search(r'sign=(.*?)&appId=(.*?)&paras=(.*?)&format=(.*?)&clientType=(.*?)&version=(.*?)">', response.text)

    url = 'https://open.e.189.cn/api/logbox/oauth2/unifyAccountLogin.do?sign=' + ret.group(1) + '&appId=' + ret.group(
        2) + '&paras=' + ret.group(3) + '&format=' + ret.group(4) + '&clientType=' + ret.group(
        5) + '&version=' + ret.group(6)

    response = session.get(url, headers={"User-Agent": UA})
    text = response.text

    captchaToken = re.search(r"captchaToken' value='(.*?)'>", text).group(1)

    ret = re.search(r"clientType = '(.*?)'[\s\S]*?accountType = '(.*?)'[\s\S]*?appKey = '(.*?)'", text)
    clientType = ret.group(1)
    accountType = ret.group(2)
    appKey = ret.group(3)

    paramId = re.search(r'paramId = "(.*?)"', text).group(1)
    REQID = re.search(r'reqId = "(.*?)"', text).group(1)
    lt = re.search(r'lt = "(.*?)"', text).group(1)

    headers = {
        'User-Agent': UA,
        'Host': 'open.e.189.cn',
        'Origin': 'https://open.e.189.cn',
        'Referer': url,
        'REQID': REQID,
        'lt': lt,
    }
    data = {
        'appKey': appKey,
        'accountType': accountType,
        'validateCode': "",  # 验证码
        'captchaToken': captchaToken,
        'returnUrl': 'https://e.189.cn/user/loginMiddle.do?returnUrlMid=https://e.189.cn/user/index.do',
        'mailSuffix': '',
        'dynamicCheck': 'FALSE',
        'clientType': clientType,
        'cb_SaveName': '1',
        'isOauth2': 'false',
        'state': '',
        'paramId': paramId,
        'userName': username,
        'password': password,
    }
    response = session.post(login_url, headers=headers, data=data)

    # print(data)
    print(response.text)


print(execjs.get().name)
if execjs.get().name != 'Node.js (V8)':
    print('请安装V8 引擎')

if __name__ == '__main__':
    user = input('用户名>>>')
    pwd = input('密码>>>')
    login(user, pwd)
