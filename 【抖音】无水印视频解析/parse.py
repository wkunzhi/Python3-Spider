# -*- encoding: utf-8 -*-
# Auth: Zok  Email: 362416272@qq.com
# Date: 2020/3/6

import re
import requests
import json


class ParseVideo:

    def __init__(self, share):
        path = self.get_url(share)
        self.url = 'https://v.douyin.com/' + path + '/'
        self.headers = {
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        }
        self.session = requests.session()
        self.first_url = None

    @staticmethod
    def get_url(share_url):
        return re.search(r'https://v\.douyin\.com/(.*?)/', share_url).group(1)

    def go_location(self):
        response = self.session.get(self.url, headers=self.headers)
        self.first_url = response.url
        result = re.search(r'itemId: "(.*?)",[\s\S]*?uid: "(.*?)",[\s\S]*?authorName: "(.*?)",[\s\S]*?dytk: "(.*?)"',
                           response.text)
        return result

    def go_message(self, ret):
        url = 'https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=' + ret.group(1) + '&dytk=' + ret.group(4)
        response = self.session.get(url, headers=self.headers)
        json_data = json.loads(response.text)
        user_id = ret.group(2)
        user_name = ret.group(3).encode('utf-8').decode('unicode_escape')

        if json_data.get('status_code') != 0:
            print('解析失败')
            exit()
        item_list = json_data.get('item_list')[0]
        aweme_id = item_list.get('aweme_id')
        desc = item_list.get('desc')
        comment_count = item_list.get('statistics').get('comment_count')
        digg_count = item_list.get('statistics').get('digg_count')

        video = item_list.get('video')
        cover = video.get('origin_cover').get('url_list')[0]
        play_addr = video.get('play_addr_lowbr').get('url_list')[0]

        play_addr_response = self.session.get(play_addr, headers=self.headers, allow_redirects=False)
        msg = """
        用户id：{user_id}
        用户名：{user_name}
        作品id：{aweme_id}
        标题：  {desc}
        评论数：  {comment_count}
        点赞数：  {digg_count}
        封面地址：{cover}
        无水印视频：{addr}
        """.format(
            user_id=user_id,
            user_name=user_name,
            aweme_id=aweme_id,
            desc=desc,
            comment_count=comment_count,
            digg_count=digg_count,
            cover=cover,
            addr=play_addr_response.headers['location']
        )
        print(msg)

    def start(self):
        result = self.go_location()
        self.go_message(result)


if __name__ == '__main__':
    # text = '#在抖音，记录美好生活#要逆天！北京地坛医院证实新冠病毒攻击中枢神经系统 https://v.douyin.com/tW7qrw/ 复制此链接，打开【抖音短视频】，直接观看视频！'
    text = input('请输入分享链接>>>')
    pv = ParseVideo(text)
    pv.start()
