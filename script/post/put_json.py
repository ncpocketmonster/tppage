#!/usr/bin/python3
# -*- coding:utf-8 -*-

import requests
import json
import os

"""
通过requests可以向某个地址发送请求
"""

"""
response = requests.get('http://127.0.0.1:8000/asset.html')
# 通过get请求返回的文本值
print(response.text)
"""


responseDir = os.path.join('','response')
url = 'http://localhost/api/article/108'
jsonObj = {
  "article_type" : "markdown",
  "content"      : "@@@@@@@",
  #"password"     : "17004043",
  "title"        : "123",
}
response = requests.put(url,data=json.dumps(jsonObj))
# 通过get请求返回的文本值
with open('response.html', 'w') as f:
  f.write(response.text)
f.close()
 

