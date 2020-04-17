# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-10  Python: 3.7

import base64
import rsa
import hashlib
import hmac

from Crypto.Cipher import AES
from pyDes import des, CBC, PAD_PKCS5
from Crypto.Cipher import DES3


class UseAES:
    """
    AES
    除了MODE_SIV模式key长度为：32, 48, or 64,
    其余key长度为16, 24 or 32
    详细见AES内部文档
    CBC模式传入iv参数
    本例使用常用的ECB模式
    """

    def __init__(self, key):
        if len(key) > 32:
            key = key[:32]
        self.key = self.to_16(key)

    @staticmethod
    def to_16(key):
        """
        转为16倍数的bytes数据
        :param key:
        :return:
        """
        key = bytes(key, encoding="utf8")
        while len(key) % 16 != 0:
            key += b'\0'
        return key  # 返回bytes

    def aes(self):
        return AES.new(self.key, AES.MODE_ECB)  # 初始化加密器

    def encrypt(self, text):
        aes = self.aes()
        return str(base64.encodebytes(aes.encrypt(self.to_16(text))),
                   encoding='utf8').replace('\n', '')  # 加密

    def decode_bytes(self, text):
        aes = self.aes()
        return str(aes.decrypt(base64.decodebytes(bytes(
            text, encoding='utf8'))).rstrip(b'\0').decode("utf8"))  # 解密


class UseRSA:
    """
    生成密钥可保存.pem格式文件
    1024位的证书，加密时最大支持117个字节，解密时为128；
    2048位的证书，加密时最大支持245个字节，解密时为256。
    加密大文件时需要先用AES或者DES加密，再用RSA加密密钥，详细见文档
    文档:https://stuvel.eu/files/python-rsa-doc/usage.html#generating-keys
    """

    def __init__(self, number=1024):
        """
        :param number: 公钥、私钥
        """
        self.pubkey, self.private_key = rsa.newkeys(number)

    def encrypt(self, _str):
        """
        :param _str: str
        :return: bytes
        """
        content = _str.encode('utf-8')
        crypto = rsa.encrypt(content, self.pubkey)
        return crypto

    def decrypt(self, text):
        """
        :param text:bytes
        :return: str
        """
        content = rsa.decrypt(text, self.private_key)
        con = content.decode('utf-8')
        return con

    @staticmethod
    def save_pem(path_name, text):
        """
        :param path_name: 保存路径
        :param text: str
        :return:bytes
        """
        if "PEM" in path_name.upper():
            path_name = path_name[:-4]
        with open('{}.pem'.format(path_name), 'bw') as f:
            f.write(text.save_pkcs1())

    def read_pem(self, path_name, key_type):
        """
        :param path_name: 密钥文件
        :param key_type:类型
        :return:
        """
        if 'pubkey' in key_type:
            self.pubkey = rsa.PublicKey.load_pkcs1(path_name)
        else:
            self.private_key = rsa.PublicKey.load_pkcs1(path_name)
        return True

    def sign(self, message, pr_key=None, hash_method='SHA-1'):
        """
        生成明文的哈希签名以便还原后对照
        :param message: str
        :param pr_key:
        :param hash_method: 哈希的模式
        :return:
        """
        if not pr_key:
            pr_key = self.private_key
        return rsa.sign(message.encode(), pr_key, hash_method)

    def check_sign(self, mess, result, pubkey=None):
        """
        验证签名：传入解密后明文、签名、公钥，验证成功返回哈希方法，失败则报错
        :param mess: str
        :param result: bytes
        :param pubkey:
        :return: str
        """
        if None == pubkey:
            pubkey = self.private_key
        try:
            result = rsa.verify(mess, result, pubkey)
            return result
        except:
            return False


class UseDES:
    """
    des(key,[mode], [IV], [pad], [pad mode])
    key:必须正好8字节
    mode（模式）：ECB、CBC
    iv:CBC模式中必须提供长8字节
    pad:填充字符
    加密填充模式PAD_NORMAL or PAD_PKCS5
    """

    def __init__(self, key, iv):
        if not isinstance(key, bytes):
            key = bytes(key, encoding="utf8")
        if not isinstance(iv, bytes):
            iv = bytes(iv, encoding="utf8")
        self.key = key
        self.iv = iv

    def encrypt(self, text):
        """
        DES 加密
        :param text: 原始字符串
        :return: 加密后字符串，bytes
        """
        if not isinstance(text, bytes):
            text = bytes(text, "utf-8")
        secret_key = self.key
        iv = self.iv
        k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)
        en = k.encrypt(text, padmode=PAD_PKCS5)
        return en

    def des_crypt(self, text):
        """
        DES 解密
        :param text: 加密后的字符串，bytes
        :return:  解密后的字符串
        """
        secret_key = self.key
        iv = self.iv
        k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)
        de = k.decrypt(text, padmode=PAD_PKCS5)
        return de.decode()


class UseDES3:
    """
    new(key, mode, *args, **kwargs)
    key:必须8bytes倍数介于16-24
    mode：
    iv:初始化向量适用于MODE_CBC、MODE_CFB、MODE_OFB、MODE_OPENPGP，4种模式
        ``MODE_CBC``, ``MODE_CFB``, and ``MODE_OFB``长度为8bytes
        ```MODE_OPENPGP```加密时8bytes解密时10bytes
        未提供默认随机生成
    nonce：仅在 ``MODE_EAX`` and ``MODE_CTR``模式中使用
            ``MODE_EAX``建议16bytes
            ``MODE_CTR``建议[0, 7]长度
            未提供则随机生成
    segment_size：分段大小，仅在 ``MODE_CFB``模式中使用，长度为8倍数，未指定则默认为8
    mac_len： 适用``MODE_EAX``模式，身份验证标记的长度（字节），它不能超过8（默认值）
    initial_value：适用```MODE_CTR```，计数器的初始值计数器块。默认为**0**。
    """

    def __init__(self, key):
        self.key = key
        self.mode = DES3.MODE_ECB

    def encrypt(self, text):
        """
        传入明文
        :param text:bytes类型，长度是KEY的倍数
        :return:
        """
        if not isinstance(text, bytes):
            text = bytes(text, 'utf-8')
        x = len(text) % 8
        text = text + b'\0' * x
        de = DES3.new(self.key, self.mode)
        cipher_text = de.encrypt(text)
        return cipher_text

    def decrypt(self, text):
        de = DES3.new(self.key, self.mode)
        plain_text = de.decrypt(text)
        st = str(plain_text.decode("utf-8")).rstrip('\0')
        return st


def use_md5(test):
    if not isinstance(test, bytes):
        test = bytes(test, 'utf-8')
    m = hashlib.md5()
    m.update(test)
    return m.hexdigest()


def use_hmac(key, text):
    if not isinstance(key, bytes):
        key = bytes(key, 'utf-8')
    if not isinstance(text, bytes):
        text = bytes(text, 'utf-8')
    h = hmac.new(key, text, digestmod='MD5')
    return h.hexdigest()


def use_sha(text):
    if not isinstance(text, bytes):
        text = bytes(text, 'utf-8')
    sha = hashlib.sha1(text)
    encrypts = sha.hexdigest()
    return encrypts


if __name__ == '__main__':
    # AES
    aes_test = UseAES("TestKey")
    a = aes_test.encrypt("AES加密")
    b = aes_test.decode_bytes(a)
    print(b)

    # RSA
    rsa_test = UseRSA()
    a = rsa_test.encrypt("RSA加密")
    b = rsa_test.decrypt(a)
    print(b)

    # DES
    des_test = UseDES(b"12345678", b"12345678")
    a = des_test.encrypt("DES加密")
    b = des_test.des_crypt(a)
    print(b)

    # DES3
    des3_test = UseDES3(b"123456789qazxswe")
    a = des3_test.encrypt("测试加密")
    b = des3_test.decrypt(a)
    print(b)

    # MD5
    md5_test = use_md5("MD5")
    print(md5_test)

    # HMAC
    hmac_test = use_hmac("123456", "测试")
    print(hmac_test)

    # SHA
    sha_test = use_sha("SHA")
    print(sha_test)
