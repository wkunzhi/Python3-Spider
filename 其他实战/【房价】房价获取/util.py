# -*- encoding: utf-8 -*-
# Auth: Zok  Email: 362416272@qq.com
# Date: 2020/2/21


from pyDes import *
import base64

KEY = b'hjkiuy6754edxc32890tfhjkw23xdea'[:24]  # 密钥只需要24位
IV = b'jhf5632s'


def des3_encrypt(s):
    """
    3DES 加密
    :param s: 原始字符串
    :return: 加密后字符串，16进制
    """
    k = triple_des(KEY, CBC, IV, pad=None, padmode=PAD_PKCS5)
    en = k.encrypt(s, padmode=PAD_PKCS5)
    return base64.b64encode(en).decode('utf-8')


def des3_decrypt(s):
    """
    3DES 解密
    :param s: 加密字符串
    :return: 明文
    """
    _str = base64.b64decode(s)
    k = triple_des(KEY, CBC, IV, pad=None, padmode=PAD_PKCS5)
    en = k.decrypt(_str, padmode=PAD_PKCS5).decode('utf-8')
    return en


def decrypt_str(s):
    info = des3_decrypt(s)  # 获得 解密后得 base64
    content = info[:-6]
    hIndex = base64.b64decode(info[-6:].replace("==", "")).decode().split("_")
    content2 = content[int(hIndex[0]):]
    txt = base64.b64decode(
        content2[: len(content2)-int(hIndex[1])][::-1]
    ).decode('utf-8').replace("##", "").replace("{@mk7}", "")
    return txt


def make_str(enB):
    """
    复写字符串算法

    根据传入文档，转换ascii并计算和
    并复写算法
    for (byte item : enB.getBytes("UTF-8")) {
        sumResult = Long.valueOf(sumResult.longValue() + ((long) item));
    }
    """
    count = 0
    for i in enB:
        count += ord(i)
    # print('合', count)  # 每个字符的 Ascii 码的总和
    p = count % len(enB)
    n = 1
    # print('position', p)
    while p + n < len(enB) and p - n >= 0:
        enB = rep(
            rep(enB, p + n, enB[p - n]),
            p - n,
            enB[p + n]
        )
        n += 1
    return enB


def rep(source, index, rep_str):
    """
    复写的java层字符转换方法
    :return:
    """
    str1 = source[0: index]
    return str1 + rep_str + source[index + 1:]


if __name__ == '__main__':
    decrypt_str("AaDaKV8GxE77rIScVyq7E0rebiFQjhrkq8PUcmR8A22NHhAW58pQkQ==")
