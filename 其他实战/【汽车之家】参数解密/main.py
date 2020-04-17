# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-26  Python: 3.7

import execjs


def main(pwd):
    """只解决了pwd的加密，其他请自行拓展
    :param pwd:
    :return:
    """
    with open('execute.js', 'r', encoding='utf-8') as f:
        js = execjs.compile(f.read())

    print('引擎', execjs.get().name)

    sign = js.call('hex_md5', pwd)
    return sign


if __name__ == '__main__':
    pwd = input('请输入你的密码：')
    print(main(pwd))
