# -*- coding: utf-8 -*-
# __author__ = "zok" 
# Date: 2019/3/7  Python: 3.7
import os

from fake_useragent import UserAgent


class RandomUserAgentMiddleware(object):
    """
    first to use location  because it is the fastest
    """

    def __init__(self):
        location = f'{os.getcwd()}/toolkits/fake_useragent.json'
        self.agent = UserAgent(path=location)
        # self.agent = UserAgent(verify_ssl=False)
        # self.agent = UserAgent(use_cache_server=False)

    @classmethod
    def from_crawler(cls, crawler):
        return cls()

    def process_request(self, request, spider):
        request.headers.setdefault('User-Agent', self.agent.random)
