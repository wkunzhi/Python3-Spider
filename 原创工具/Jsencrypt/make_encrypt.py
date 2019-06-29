# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-06-28  Python: 3.7

import base64

from Crypto.Cipher import PKCS1_v1_5 as Cipher_pkcs1_v1_5
from Crypto.PublicKey import RSA


public_key = """
-----BEGIN PUBLIC KEY-----
Your PUBLIC KEY
-----END PUBLIC KEY-----
"""


def make_message(pwd):
    rsakey = RSA.importKey(public_key)
    cipher = Cipher_pkcs1_v1_5.new(rsakey)
    cipher_text = base64.b64encode(cipher.encrypt(pwd.encode(encoding="utf-8")))
    return cipher_text.decode('utf8')


if __name__ == '__main__':
    print(make_message('hellow'))
