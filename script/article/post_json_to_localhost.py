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


rootDir = '/home/whm/tp5page/script/article'
jsonDir = os.path.join(rootDir,'json')
responseDir = os.path.join(rootDir,'response')
url = 'http://www.ncpocketmonster.com/api/article'

def post_data_to_url(data,url,responseFileName):
  # 对于我们工作中的自己人,我们一般会使用别的验证,而不是csrf_token验证
  response = requests.post(url,data=json.dumps(data))
  print(data['title'])
  # 通过get请求返回的文本值
  with open(responseFileName, 'w') as f:
    f.write(response.text)
  f.close()

for file in os.listdir(jsonDir):
  fp = open(os.path.join(jsonDir,file))
  file_data_string = fp.read()
  file_data_object = json.loads(file_data_string)
  # split the file to 2 parts: name and posfix
  [file_name,file_posfix] = file.split('.')
  output_file_name = os.path.join(responseDir,file_name+'.html')
  post_data_to_url( file_data_object ,url , output_file_name)
  
