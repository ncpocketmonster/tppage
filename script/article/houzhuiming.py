import os

files = os.listdir("/home/whm/tp5page/script/article/txt")#列出当前目录下所有的文件

for filename in files:
    portion = os.path.splitext(filename)#分离文件名字和后缀
    print(portion)

    if portion[1] ==".json":#根据后缀来修改,如无后缀则空
        newname = portion[0]+".txt"#要改的新后缀
        os.chdir("/home/whm/tp5page/script/article")#切换文件路径,如无路径则要新建或者路径同上,做好备份
        os.rename(filename,newname)