# 了解 RSA 
1. 甲要传密信给乙，乙先根据某种算法得出本次与甲通信的公钥与私钥
2. 乙将公钥传给甲（公钥可以让任何人知道，即使泄露也没有任何关系）
3. 甲使用乙传给的公钥加密要发送的信息原文m，发送给乙密文c
4. 乙使用自己的私钥解密密文c，得到信息原文m

> 如果公钥加密的信息只有私钥解得开，那么只要私钥不泄漏，通信就是安全的。

# jsencrypt.js

> 用于执行OpenSSL RSA加密，解密和密钥生成的Javascript库, 目前有很多 RSA 加密的网站用的该JS操作。

[**jsencrypt源码**](https://github.com/travist/jsencrypt)

js加密使用方法如下, 重点语句如下
```javascript
// Encrypt with the public key...
var encrypt = new JSEncrypt();
encrypt.setPublicKey($('#pubkey').val());
var encrypted = encrypt.encrypt($('#input').val());
```

**通常前端利用公钥对传输数据进行加密，传输给后台后台再对加密数据用私钥解密。**

![原始数据](https://www.zhangkunzhi.com/images/rsa加密后的样子.png)

# 仿 encrypt 生成数据
[**GitHub代码**](https://github.com/wkunzhi/SpiderUtilPackage/blob/master/Jsencrypt/make_encrypt.py)



```python
"""python3.7"""

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
    print(make_message('hello'))
```