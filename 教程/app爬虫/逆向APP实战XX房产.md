# 需求分析
- 拿到每套房子房价
- 拿到所有户型介绍

# 抓关键包
- 房价请求包
- 工具 Charles

抓包如下

![原始数据](https://www.zhangkunzhi.com/images/20190720/房价信息.png)

看这样子内容是加密后在app内不进行解密完成的， 那么我们要获取到通过api请求到的真实数据就需要拆解app！获取其加解密方法才行。

# 壳检测
- 可以用工具查看是否有壳
- 或者查看特征
- 检测混淆

百度加固特征明显所以判断为百度加固
![原始数据](https://www.zhangkunzhi.com/images/20190720/查看到百度加固.png)

# 脱壳
- 此处省略 500 字（发这些会被举报）
- 利用反编译工具 `jadx` 对 apk 进行反编译

# 跟踪代码
![原始数据](https://www.zhangkunzhi.com/images/20190720/房价查询目录.png)

1. 查看到 cmdDHP 就是我们请求的 url
2. 查看调用 cmdDHP 到位置

    ```java
    public static void getHousePrice(String houseId, String bId, String unitId, RequestResultI requestResultI) {
        RequestParams params = new RequestParams();
        StringBuffer sb = new StringBuffer();
        String sp = "$$@$$";
        for (int i = 0; i < 30; i++) {
            if (i == 3) {
                sb.append(houseId);
            } else if (i == 4) {
                sb.append(bId);
            } else if (i == 9) {
                sb.append(unitId);
            } else {
                sb.append(new Random().nextInt(100) + "");
            }
            sb.append(sp);
        }
        String str = "";
        params.put("key", Utils.encodeKey(sb.toString()));
        SendRequest.getInstance().get(112, params, cmdDHP, requestResultI);
    }
    ```

## 检查参数
>方法参数 房屋id  bID? unitId 开放商id?  然后对其拼接发送的 get 请求

## 跟踪解密方法
> 搜索 response

## 查找找到基类
> ResponseBaseModel 或 ResponseBaseDomain

```java
private static final String key_Code = "Code";
private static final String key_Data = "Data";
private static final String key_Remark = "Remark";
private static final String key_Total = "Total";	
    
// 找到json关键字样 
 public ResponseBaseModel(JSONObject response) throws Exception {
    if (response.has(key_Code)) {
        this.Code = response.getString(key_Code);
    }
    if (response.has(key_Remark)) {
        this.Remark = response.getString(key_Remark);
    }
    if (response.has(key_Data)) {
        this.Data = response.getString(key_Data);
    }
    if (response.has(key_Total)) {
        this.Total = response.getInt(key_Total);
    }
}
```
    
## 跟踪到解密模块

```java
// 解密工作模块
    
public static String decodeB(String encryptText) {
    try {
        checkKeyAndIv();
        Key deskey = SecretKeyFactory.getInstance("desede").generateSecret(new DESedeKeySpec(secretKey.getBytes())); // key 处理
        Cipher cipher = Cipher.getInstance("desede/CBC/PKCS5Padding");
        cipher.init(2, deskey, new IvParameterSpec(iv.getBytes()));
        return new String(cipher.doFinal(Base64.decodeBase64(encryptText)), "UTF-8");
    } catch (Exception e) {
        e.printStackTrace();
        return "";
    }
}
    
public static String decodeA(String en) {
    String content = "";
    try {
        checkKeyAndIv();
        String den = decodeB(en);
        String content2 = den.substring(0, den.length() - 6);
        String[] hIndex = decodeBase64(den.substring(den.length() - 6, den.length()).replace("==", ""), "UTF-8").split("_");
        String content3 = content2.substring(Integer.valueOf(hIndex[0]).intValue(), content2.length());
        return decodeBase64(new StringBuffer(content3.substring(0, content3.length() - Integer.valueOf(hIndex[1]).intValue())).reverse().toString(), "UTF-8").replace("##", "").replace("{@mk7}", "");
    } catch (Exception e) {
        e.printStackTrace();
        return content;
    }
}
```
    
## 检查 key 与 Iv
发现每次解密都会调用 `checkKeyAndIv()`

```java
// 每次加解密都会调用check 函数来看是否有key
private static void checkKeyAndIv() {
    if (stringIsNull(secretKey) || stringIsNull(iv)) {
        secretKey = FuniSecret.getSecretKey();
        iv = FuniSecret.getSecretIv();
    }
}
```
    

## 跟踪获取 Key 与 Iv 处

```java
// 再次跟踪到 getSecretIv
package com.funi.cloudcode.util;
    
public class FuniSecret {
    public static native String getSecretIv();
    
    public static native String getSecretKey();
    
    static {
        System.loadLibrary("FuniSecret");
    }
}
```

# SO 层跟踪
> 在上面看到了 **`native`**, 与 **`System.loadLibrary("FuniSecret")`**
> 发现 **他们是将 key 与 Iv 在 SO 层(C/C++)处理好， 交给 java 处理的**

## 静态调试 SO 层
> 他们用的是 DES 加密
> 最终找到 **Key** 与 **Iv**

![原始数据](https://www.zhangkunzhi.com/images/20190720/IDA调试结果.png)

# 再利用 python 实现 DES 解密过程即可
> 此处省略

# 感谢

[**lilac**](https://github.com/Pr0214) , [**小周**](https://github.com/locoz666)

以上两位的支持与帮忙