# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-13  Python: 3.7

import requests
import json
import time
import asyncio
import aiohttp

ERROR = {
    '1001': '参数token不能为空',
    '1002': '参数action不能为空',
    '1003': '参数action错误',
    '1004': 'token失效',
    '1005': '用户名或密码错误',
    '1006': '用户名不能为空',
    '1007': '密码不能为空',
    '1008': '账户余额不足',
    '1009': '账户被禁用',
    '1010': '参数错误',
    '1011': '账户待审核',
    '1012': '账户暂停使用',
    '1013': '接口功能未开启',
    '1014': '接口登录未开启',
    '2001': '参数itemid不能为空',
    '2002': '项目不存在',
    '2003': '项目未启用',
    '2004': '暂时没有可用的号码',
    '2005': '获取号码数量已达到上限',
    '2006': '参数mobile不能为空',
    '2007': '号码已被释放',
    '2008': '号码已离线',
    '2009': '发送内容不能为空',
    '2010': '号码正在使用中',
    '3001': '尚未收到短信',
    '3002': '等待发送',
    '3003': '正在发送',
    '3004': '发送失败',
    '3005': '订单不存在',
    '9001': '系统错误',
    '9002': '系统异常',
}


class YMReg(object):

    def __init__(self, token, project_code, aio_count=20):
        """
        :param token: 账号 token，在官网后台查询
        :param project_code: 项目编码，官网查询
        :param aio_count: 并发上限默认 20 (官方)
        """
        self.token = token
        self.project_code = project_code
        self.aio_count = aio_count

        print(self.get_balance)  # 打印余额

    @property
    def get_balance(self):
        """查询余额
        """
        balance_api = 'http://api.fxhyd.cn/UserInterface.aspx?action=getaccountinfo&token={token}&format=1'
        target_url = balance_api.format(token=self.token)
        response = requests.get(target_url)
        if response.status_code == 200:
            state, data = response.text.split('|')
            return '当前余额： %s 元' % json.loads(data).get('Balance')
        else:
            return '获取失败请检测账号'

    @ staticmethod
    def filter_info(message):
        if message in ERROR:
            return ERROR.get('message')
        elif len(message.split('|')) == 2:
            return message.split('|')[1]  # 返回正确信息
        elif message == 'success':
            return '拉黑或释放成功'
        else:
            return '未知错误'

    async def get_node(self, session, phone):
        """接收短信
        """
        for i in range(12):
            await asyncio.sleep(5)
            node_api = 'http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token={token}&itemid={itemid}&mobile={phone}&release=1&timestamp={time}'
            target_url = node_api.format(token=self.token, itemid=self.project_code, phone=phone, time=time.time())
            async with session.get(target_url) as response:
                message = await response.text()
                rest = self.filter_info(message)
                if rest:
                    return phone + rest

        await self.join_black_list(session, phone)  # 获取失败加入黑名单
        return '%s 短信获取失败' % phone

    async def fetch_phone(self, session):
        """获取手机
        """
        get_phone_api = 'http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token={token}&itemid={itemid}&timestamp={time}'
        target_url = get_phone_api.format(token=self.token, itemid=self.project_code, time=time.time())
        async with session.get(target_url) as response:
            message = await response.text()
            return self.filter_info(message)

    async def work(self):
        """开始工作
        """
        async with aiohttp.ClientSession() as session:
            result = await self.fetch_phone(session)
            print('提取手机', result)

            # 短信接收
            result2 = await self.get_node(session, result)
            print(result2)

            # 释放
            result3 = await self.del_phone(session, result)
            print(result3)

    async def del_phone(self, session, phone):
        """默认收到短信自动释放手机号，特殊情况可以单独调用释放
        """
        del_phone_api = 'http://api.fxhyd.cn/UserInterface.aspx?action=release&token={token}&itemid={itemid}&mobile={phone}'
        target_url = del_phone_api.format(token=self.token, itemid=self.project_code, phone=phone)
        async with session.get(target_url) as response:
            message = await response.text()
            return self.filter_info(message)

    async def join_black_list(self, session, phone):
        """拉入黑名单，获取短信失败情况下拉入黑名单
        """
        black_list_api = 'http://api.fxhyd.cn/UserInterface.aspx?action=addignore&token={token}&itemid={itemid}&mobile={phone}'
        target_url = black_list_api.format(token=self.token, itemid=self.project_code, phone=phone)
        async with session.get(target_url) as response:
            message = await response.text()
            return self.filter_info(message)

    def start(self):
        """开始工作
        """
        loop = asyncio.get_event_loop()
        tasks = [asyncio.ensure_future(self.work()) for _ in range(self.aio_count)]
        loop.run_until_complete(asyncio.wait(tasks))


if __name__ == '__main__':
    """验证码平台 http://www.51ym.me/User/Default.aspx"""

    ym = YMReg('后台查询token', '填写int类型项目编号，后台查询', 1)
    ym.start()
