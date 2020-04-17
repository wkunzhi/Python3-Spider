# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-05  Python: 3.7

import requests, time
from urllib.parse import urlencode
from urllib.request import urlretrieve


def getPage(offset):
    '''获取网页信息'''
    data = {
        'tn': 'resultjson_com',
        'ipn': 'rj',
        'ct': '201326592',
        'is': '',
        'fp': 'result',
        'queryWord': '街拍',
        'cl': '2',
        'lm': '-1',
        'ie': 'utf - 8',
        'oe': 'utf - 8',
        'adpicid': '',
        'st': '-1',
        'z': '',
        'ic': '0',
        'hd': '',
        'latest': '',
        'copyright': '',
        'word': '街拍',
        's': '',
        'se': '',
        'tab': '',
        'width': '',
        'height': '',
        'face': '0',
        'istype': '2',
        'qc': '',
        'nc': '1',
        'fr': '',
        'expermode': '',
        'force': '',
        'pn': offset,
        'rn': '30',
        'gsm': '1e',
        '1551789143500': '',
    }
    headers = {
        'Accept': 'text/plain, */*; q=0.01',
        'Accept-Encoding': 'deflate, br',
        'Accept-Language': 'Accept-Language',
        'Connection': 'keep-alive',
        'Cookie': 'BDqhfp=%E8%A1%97%E6%8B%8D%26%260-10-1undefined%26%260%26%261; BIDUPSID=7CA5F033CA22949F5FB6110DBC5DC1EE; BAIDUID=6DDE5BAA44763FD6C7CA84401CB19F36:FG=1; indexPageSugList=%5B%22%E8%A1%97%E6%8B%8D%22%5D; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; uploadTime=1551768107224; userFrom=null; BDRCVFR[X_XKQks0S63]=mk3SLVN4HKm; firstShowTip=1; cleanHistoryStatus=0',
        'Host': 'image.baidu.com',
        'Referer': 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E8%A1%97%E6%8B%8D&oq=%E8%A1%97%E6%8B%8D&rsp=-1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.6735.400 QQBrowser/10.2.2328.400',
        'X-Requested-With': 'XMLHttpRequest',
    }
    url = 'https://image.baidu.com/search/acjson?' + urlencode(data)
    try:
        res = requests.get(url, data=data, headers=headers)
        res.encoding = 'utf-8'  # 网页信息编码
        if res.status_code == 200:
            return res.json()
    except requests.ConnectionError:
        return None


def getImage(json):
    '''解析网页数据并爬取所需的信息'''
    try:
        data = json.get('data')
        if data:
            for item in data:
                yield {
                    'image': item.get('hoverURL'),
                    'title': item.get('fromPageTitleEnc'),
                }
    except:
        return None


def saveImage(item):
    '''把获取的图片与标题封装并存储'''
    try:
        m = item.get('title')
        local_image = item.get('image')  # 获取图片的url
        image_url = local_image
        urlretrieve(image_url, './pic/' + str(m) + '.jpg')
        # print('p'+str(m) + '.jpg')
    except:
        return None


def main(offset):
    '''调度爬取函数和存储'''
    json = getPage(offset)
    for item in getImage(json):
        print(item)
        saveImage(item)


if __name__ == '__main__':
    for i in range(5):  # 此处循环遍历五次是不可行的  每次data值中的gsm在变化
        main(offset=i * 30)
        time.sleep(1)
