#!/usr/bin/python3
# -*- coding:utf-8 -*-

import requests

"""
通过requests可以向某个地址发送请求
"""

"""
response = requests.get('http://127.0.0.1:8000/asset.html')
# 通过get请求返回的文本值
print(response.text)
"""


# post发送的数据
postData = {
    'author':'ncpm',
    'title':'try python web spider',
    'keyword':['python','spider'],
    'article_type':'technique',
    'content':'nothing',
}

# 对于我们工作中的自己人,我们一般会使用别的验证,而不是csrf_token验证
import json
ddd = json.dumps(postData)
response = requests.post('http://www.ncpocketmonster.com/article',data=ddd)
# 通过get请求返回的文本值
with open('/home/whm/tp5page/script/pachong.html', 'w') as f:
  f.write(response.text)
  f.close()
