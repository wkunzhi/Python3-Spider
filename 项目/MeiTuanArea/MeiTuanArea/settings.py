# -*- coding: utf-8 -*-


BOT_NAME = 'MeiTuanArea'  # 爬虫项目名

SPIDER_MODULES = ['MeiTuanArea.spiders']  # 爬虫目录设定
NEWSPIDER_MODULE = 'MeiTuanArea.spiders'  # 爬虫生成目录

ROBOTSTXT_OBEY = False  # 否认协议

RANDOMIZE_DOWNLOAD_DELAY = True  # 开启随机增加毫秒级延迟，增加访问成功率

DOWNLOAD_FAIL_ON_DATALOSS = False  # 重试处理

DOWNLOAD_TIMEOUT = 5  # 设置超时时间，避免ip失效等待时间过长

# HTTPERROR_ALLOWED_CODES = [301]  # 禁止301

# 指定终端输出日志、日志位置
# LOG_LEVEL = 'WARNING'
# LOG_FILE = 'error_log.txt'

HTTPERROR_ALLOWED_CODES = [403]

# UA
USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'

# mysql
MYSQL_HOST = '127.0.0.1'
MYSQL_PORT = 3306
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'mysql 密码'
MYSQL_DB_NAME = 'mysql库'

# API 百度地图坐标获取API，申请后填写即可
API_AK = '百度地图 api ak'


