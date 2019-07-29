# AES 加密
> 高级加密标准(AES,Advanced Encryption Standard)为最常见的对称加密算法。对称加密算法也就是加密和解密用相同的密钥，具体的加密流程如下图：

![](https://static.zhangkunzhi.com/images/20190711/aes流程.png)

# 在线测试网址
[**加解密测试**](http://tool.chacuo.net/cryptaes)

# 各部分作用

## 明文 P
> 待加密的明文数据

## 密钥 K
> 用来加密明文的密码（对称加密中加解密为**同一个密钥**）

### 密钥传输
不可以直接在网络上传输，否则会导致**密钥泄漏**，通常是 **通过非对称加密算法加密密钥，然后再通过网络传输给对方** ，或者直接面对面商量密钥。密钥是绝对不可以泄漏的，否则会被攻击者还原密文，窃取机密数据。

## AES 加密函数
> 设AES加密函数为E，则 C = E(K, P),其中P为明文，K为密钥，C为密文。也就是说，把明文P和密钥K作为加密函数的参数输入，则加密函数E会输出密文C。

## 密文 C
> 经加密函数处理后的数据

## AES 解密函数
> 设AES解密函数为D，则 P = D(K, C),其中C为密文，K为密钥，P为明文。也就是说，把密文C和密钥K作为解密函数的参数输入，则解密函数会输出明文P。


# 对称与非对称加密

## 对称加密
> 加密和解密用到的密钥是相同的，这种加密方式加密速度非常快，适合经常发送数据的场合。缺点是密钥的传输比较麻烦。

**实际中，一般是通过 RSA 加密 AES 的密钥，传输到接收方，接收方解密得到AES密钥，然后发送方和接收方用AES密钥来通信。**

## 非对称加密
> 加密和解密用的密钥是不同的，这种加密方式是用数学上的难解问题构造的，通常加密解密的速度比较慢，适合偶尔发送数据的场合。优点是密钥传输方便。常见的非对称加密算法为 RSA、ECC 和 EIGamal。


# Python 代码实现
```python
import base64
from Crypto.Cipher import AES

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
```

# AES 原理
1. **字节映射替换**
2. **行位移**
3. **列混淆**
4. **轮密钥加**
5. **密钥扩展**

## 字节替换
> AES的字节代换其实就是一个简单的查表操作。AES定义了一个S盒和一个逆S盒。

![](https://www.zhangkunzhi.com/images/20190711/AES的S盒.png)

状态矩阵中的元素按照下面的方式映射为一个新的字节：把该字节的高4位作为行值，低4位作为列值，取出S盒或者逆S盒中对应的行的元素作为输出。例如，加密时，输出的字节S1为0x12,则查S盒的第0x01行和0x02列，得到值0xc9,然后替换S1原有的0x12为0xc9

## 行位移
> 行移位的功能是实现一个4x4矩阵内部字节之间的置换
> **第一行不变，第二行循环左移1个字节，第二行循环左移2个字节，第三行循环左移3个字节** 

![](https://static.zhangkunzhi.com/images/20190711/行位移.png)

## 列混淆
> 这一步，输入数组的每一列要和一个名为修补矩阵（fixed matrix）的二维常量数组做矩阵**相乘**，得到对应的输出列

![](https://static.zhangkunzhi.com/images/20190711/列混淆.png)

## 加轮密钥
> **唯一用到密钥的一步** 128bit 的密钥也被排列成 4*4 的矩阵。
> 让输入数组的每一个字节a[i,j]与密钥对应位置的字节k[i,j]异或一次，就生成了输出值b[i,j]。

**加密的每一轮所用到的密钥并不是相同的这里涉及到一个概念：扩展密钥**

## 扩展密钥
AES 源代码中用长度 4 * 4 *（10+1） 字节的数组 W 来存储所有轮的密钥。W{0-15} 的值等同于原始密钥的值，用于为初始轮做处理。

后续每一个元素 W[i] 都是由 W[i-4] 和 W[i-1] 计算而来，直到数组 W 的所有元素都赋值完成。

W 数组当中，W{0-15} 用于初始轮的处理，W{16-31} 用于第1轮的处理，W{32-47} 用于第2轮的处理 ......一直到 W{160-175} 用于最终轮（第10轮）的处理。


# 五种加密模式
> **AES 加密器内部流程是相同的。 五种加密模式只是明文块之间的关联区别**

## ECB 模式
> ECB 模式是最简单的工作模式，在该模式下，每一个明文块的加密都是完全独立，互不干涉的。

![](https://static.zhangkunzhi.com/images/20190711/ecb模式.png)


- [x] 优点: 简单、 有利于并行计算。
- [ ] 缺点: 同样的明文 加密后会变成相同的密文块。

## CBC 模式
> CBC 模式引入了一个新的概念：初始向量IV（Initialization Vector）， 它的作用和MD5的“加盐”有些类似，目的是防止同样的明文块始终加密成同样的密文块。

![](https://static.zhangkunzhi.com/images/20190711/cbc模式.png)


CBC模式在每一个明文块加密前会让明文块和一个值先做异或操作。IV作为初始化变量，参与第一个明文块的异或，后续的每一个明文块和它前一个明文块所加密出的密文块相异或。

这样以来，相同的明文块加密出的密文块显然是不一样的。

- [x] 优点: 安全性更高。
- [ ] 缺点: 1. 无法并行计算性能上不如ECB  2. 引入初始化向量IV增加复杂度