# -*- coding: utf-8 -*-

# 阿布云代理 IP
PROXY_USER = ''
PROXY_PASS = ''

BOT_NAME = 'HouseScrapy'

SPIDER_MODULES = ['spiders']
NEWSPIDER_MODULE = 'spiders'

# 否认协议
ROBOTSTXT_OBEY = False

# 随机延迟
RANDOMIZE_DOWNLOAD_DELAY = True

# 重试处理
DOWNLOAD_FAIL_ON_DATALOSS = False

# 设置超时时间
DOWNLOAD_TIMEOUT = 5

# MongoDB
MONGODB_URL = 'mongodb://localhost:27017'
MONGODB_DB = '房产'
MONGODB_COLL = '地产数据'


# Redis
REDIS_HOST = '127.0.0.1'  # 本机
REDIS_WORD = None
REDIS_PORT = 6379

# 限流 秒/次
DOWNLOAD_DELAY = 1 / 10

# 禁止301
# HTTPERROR_ALLOWED_CODES = [301]

# 日志配置
# LOG_LEVEL = 'WARNING'
# LOG_FILE = 'log/error_log.txt'


# Headers
DEFAULT_REQUEST_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
    'Host': 'www.funi.com'
}


"""项目独立配置区"""

# HOST
HOST = 'http://www.funi.com'


"""===== 分布式配置区 ====="""

# # 去重，利用set指纹去重
# DUPEFILTER_CLASS = 'scrapy_redis.dupefilter.RFPDupeFilter'
#
# # 调度器
# SCHEDULER = 'scrapy_redis.scheduler.Scheduler'
#
# # 去重指纹的set
# SCHEDULER_PERSIST = True
#
# # 配置密码
# REDIS_PARAMS = {
#     'password': REDIS_WORD,
# }
#
#