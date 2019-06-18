# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-23  Python: 3.7


from DataMigration.db.MongoDB import Mongo
from DataMigration.db.Mysql import Mysql
from DataMigration.config import MYSQL_DB_NAME


class Migrate(object):
    def __init__(self,mysql_table_name, mongodb_name, mongodb_collection):
        self.mongo = Mongo(mongodb_name, mongodb_collection)
        self.mysql = Mysql()
        self.mysql_name = mysql_table_name

    def easy_to_mongo(self, column_comment=False):
        """
        将输入插入 mongodb
        :return:
        """
        columns = self.get_column()
        nodes = self.all_mysql_data()
        data_list = []

        for node in nodes:
            data_dict = {}
            for index, column in enumerate(columns):
                if column_comment:
                    data_dict[column[1]] = node[index]
                else:
                    data_dict[column[0]] = node[index]
            data_list.append(data_dict)
        try:
            self.mongo.insert(data_list, insert_one=False)
            print('储存成功')
        except Exception:
            print('转存失败')

    def all_mysql_data(self):
        """
        获取需要转换的数据
        :return: 所有 mysql 数据
        """
        sql = """SELECT * from {table_name};""".format(table_name=self.mysql_name)
        return self.mysql.select(sql)

    def get_column(self):
        """
        取字段名
        :return: (字段名,字段描述)
        """
        sql = """select COLUMN_NAME,column_comment 
        from INFORMATION_SCHEMA.Columns 
        where table_name='{table_name}' and table_schema='{db_name}'""".format(
            table_name=self.mysql_name,
            db_name=MYSQL_DB_NAME,
        )
        return self.mysql.select(sql)


if __name__ == '__main__':
    mi = Migrate('需要转换mysql表名', 'mongo库名', 'mongo表名')
    mi.easy_to_mongo(column_comment=True)  # column_comment=True 使用注释的字段名， 默认不使用
