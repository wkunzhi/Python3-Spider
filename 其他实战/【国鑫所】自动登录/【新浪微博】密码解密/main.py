# -*- coding: utf-8 -*-
#   __author__ = "Casey"     Email = 395280963qq.com
#   Data :2019/11/21  Python:3.7

import execjs
import requests,json,re

def Get_parameters():
    """微博加密参数有两个   用户名和密码
    用户名为 base64加密
    此处只解决了密码加密问题   其他的请自行拓展
    pubkey,time,nonce
    :return pubkey,time,nonce
    """
    try:
        url = "https://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su=MTc3MjM1NzI1OTA%3D&rsakt=mod&checkpin=1&client=ssologin.js(v1.4.19)&_=1574300620782"

        headers = {
            'User-Agent': 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14',
            'Host':'login.sina.com.cn',
            'Referer':'https://www.weibo.com/login.php',
        }

        res = requests.get(url=url,headers=headers)
        data = re.findall('sinaSSOController.preloginCallBack\((.*?)\)',res.text,re.S)[0]
        new_data = json.loads(data)
        time = new_data.get('servertime')
        nonce = new_data.get('nonce')
        pubkey = new_data.get('pubkey')
        return pubkey,time,nonce
    except Exception as err:
        print('访问失败',err)

def main(pwd):
    """
    :param pwd:
    :return:
    """
    with open('execute.js','r',encoding='utf-8') as f:
        js = execjs.compile(f.read())

        print('引擎', execjs.get().name)
        publickey,time,nonce = Get_parameters()
        sign = js.call('get_up', pwd,publickey,time,nonce)
        return sign

if __name__ == '__main__':
    pwd = input('请输入密码：')
    sign = main(pwd)
    print(sign)


