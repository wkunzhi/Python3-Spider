# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-09  Python: 3.7
import requests
import urllib.request
import time
import hashlib
import urllib
import re

from moviepy.editor import *  # moviepy==0.2.3.2


class DownVideo(object):
    """
    urllib.urlretrieve 的回调函数：
    def callbackfunc(blocknum, blocksize, totalsize):
        @blocknum:  已经下载的数据块
        @blocksize: 数据块的大小
        @totalsize: 远程文件的大小
    """
    start_time = None

    def __init__(self,start_go):
        self.start_go = start_go

    def get_cid_list(self):
        start_url = 'https://api.bilibili.com/x/web-interface/view?aid=' + re.search(r'/av(\d+)/*', self.start_go).group(1)
        # 视频质量
        quality = 16  # 1080p:80;720p:64;480p:32;360p:16  默认360p
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'}
        html = requests.get(start_url, headers=headers).json()
        data = html['data']
        video_title = data["title"].replace(" ", "_")
        cid_list = []
        if '?p=' in start:
            # 单独下载分P视频中的一集
            p = re.search(r'\?p=(\d+)', start).group(1)
            cid_list.append(data['pages'][int(p) - 1])
        else:
            # 如果p不存在就是全集下载
            cid_list = data['pages']

        for item in cid_list:
            cid = str(item['cid'])
            title = item['part']
            if not title:
                title = video_title
            title = re.sub(r'[\/\\:*?"<>|]', '', title)  # 替换为空的
            print('标题:' + title, 'ID', cid)
            page = str(item['page'])
            start_url = start_url + "/?p=" + page
            video_list = down.get_play_list(start_url, cid, quality)
            self.start_time = time.time()
            down.down_video(video_list, title, start_url, page)
            down.combine_video(video_list, title)

        print('下载完成了，快去撸视频吧')

    @staticmethod
    def get_play_list(start_url, cid, quality):
        """
        访问API
        """
        entropy = 'rbMCKn@KuamXWlPMoJGsKcbiJKUfkPF_8dABscJntvqhRSETg'
        appkey, sec = ''.join([chr(ord(i) + 2) for i in entropy[::-1]]).split(':')
        params = 'appkey=%s&cid=%s&otype=json&qn=%s&quality=%s&type=' % (appkey, cid, quality, quality)
        chksum = hashlib.md5(bytes(params + sec, 'utf8')).hexdigest()
        url_api = 'https://interface.bilibili.com/v2/playurl?%s&sign=%s' % (params, chksum)
        headers = {
            'Referer': start_url,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
        }
        html = requests.get(url_api, headers=headers).json()
        video_list = [html['durl'][0]['url']]
        return video_list

    def schedule_cmd(self, blocknum, blocksize, totalsize):
        speed = (blocknum * blocksize) / (time.time() - self.start_time)
        speed_str = " Speed: %s" % self.format_size(speed)
        recv_size = blocknum * blocksize

        # 设置下载进度条
        f = sys.stdout
        pervent = recv_size / totalsize
        percent_str = "%.2f%%" % (pervent * 100)
        n = round(pervent * 50)
        s = ('#' * n).ljust(50, '-')
        f.write(percent_str.ljust(8, ' ') + '[' + s + ']' + speed_str)
        f.flush()
        f.write('\r')

    def schedule(self, blocknum, blocksize, totalsize):
        """时间表
        """
        speed = (blocknum * blocksize) / (time.time() - self.start_time)
        speed_str = " Speed: %s" % self.format_size(speed)
        recv_size = blocknum * blocksize

        # 设置下载进度条
        f = sys.stdout
        pervent = recv_size / totalsize
        percent_str = "%.2f%%" % (pervent * 100)
        n = round(pervent * 50)
        s = ('#' * n).ljust(50, '-')
        print(percent_str.ljust(6, ' ') + '-' + speed_str)
        f.flush()
        time.sleep(2)

    @staticmethod
    def format_size(bytes):
        """字节bytes转化K\M\G
        """
        try:
            bytes = float(bytes)
            kb = bytes / 1024
        except:
            print("传入的字节格式不对")
            return "Error"
        if kb >= 1024:
            M = kb / 1024
            if M >= 1024:
                G = M / 1024
                return "%.3fG" % (G)
            else:
                return "%.3fM" % (M)
        else:
            return "%.3fK" % (kb)

    def down_video(self, video_list, title, start_url, page):
        """下载视频
        """
        num = 1
        print('正在下载请稍等...'.format(page))
        current_video_path = os.path.join(sys.path[0], 'bilibili下载目录', title)  # 当前目录作为下载目录
        for i in video_list:
            opener = urllib.request.build_opener()
            # 请求头
            opener.addheaders = [
                # ('Host', 'upos-hz-mirrorks3.acgvideo.com'),  #注意修改host,不用也行
                ('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:56.0) Gecko/20100101 Firefox/56.0'),
                ('Accept', '*/*'),
                ('Accept-Language', 'en-US,en;q=0.5'),
                ('Accept-Encoding', 'gzip, deflate, br'),
                ('Range', 'bytes=0-'),  # Range 的值要为 bytes=0- 才能下载完整视频
                ('Referer', start_url),  # 注意修改referer,必须要加的!
                ('Origin', 'https://www.bilibili.com'),
                ('Connection', 'keep-alive'),
            ]
            urllib.request.install_opener(opener)
            # 创建文件夹存放下载的视频
            if not os.path.exists(current_video_path):
                os.makedirs(current_video_path)
            # 开始下载
            if len(video_list) > 1:
                urllib.request.urlretrieve(url=i,
                                           filename=os.path.join(current_video_path, r'{}-{}.mp4'.format(title, num)),
                                           reporthook=self.schedule_cmd)
            else:
                urllib.request.urlretrieve(url=i, filename=os.path.join(current_video_path, r'{}.mp4'.format(title)),
                                           reporthook=self.schedule_cmd)
            num += 1

    @staticmethod
    def combine_video(video_list, title):
        """合并视频
        """
        current_video_path = os.path.join(sys.path[0], 'bilibili_video', title)  # 当前目录作为下载目录
        if len(video_list) >= 2:
            # 视频大于一段才要合并
            print('下载完成,正在合并视频...' + title)
            # 定义一个数组
            L = []
            # 访问 video 文件夹 (假设视频都放在这里面)
            root_dir = current_video_path
            # 遍历所有文件
            for file in sorted(os.listdir(root_dir), key=lambda x: int(x[x.rindex("-") + 1:x.rindex(".")])):
                # 如果后缀名为 .mp4/.flv
                if os.path.splitext(file)[1] == '.flv':
                    # 拼接成完整路径
                    filePath = os.path.join(root_dir, file)
                    # 载入视频
                    video = VideoFileClip(filePath)
                    # 添加到数组
                    L.append(video)
            # 拼接视频
            final_clip = concatenate_videoclips(L)
            # 生成目标视频文件
            final_clip.to_videofile(os.path.join(root_dir, r'{}.mp4'.format(title)), fps=24, remove_temp=False)
            print('视频合并完成' + title)

        else:
            # 视频只有一段则直接打印下载完成
            print('视频合并完成:' + title)


if __name__ == '__main__':
    start = input('请填写网页链接:')
    # 例如： https://www.bilibili.com/video/av50782610

    # 下载清晰度可以设置

    # 实例化下载类
    down = DownVideo(start)
    down.get_cid_list()


