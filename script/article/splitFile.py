# python3
import os
import json

rootDir = '/home/whm/tp5page/script/article'
dir = os.path.join(rootDir,'txt')
targetDir = os.path.join(rootDir,'json')
  
def getFileName(name,postfix=''):
  x=name.split('.')[0]
  return x+str(postfix)

def saveStrAsJsonFile(file,content,posfix=''):
  obj={
    'title':file,
    'content':content,
    'author':'鲁迅',
    'keyword':'old,classical,masterpieces',
    'article_type':'literature',
    }   
  # add a posfix for files
  if not posfix =='':
    posfix_in_total = '_'+posfix
  else:
    posfix_in_total = ''
  # create file and write
  #outputFileName=file.split('.')[0]+posfix_in_total+'.json'
  outputFileName=file+'.json'
  outputFile=open(os.path.join(targetDir,outputFileName),'w')
  outputFile.write(json.dumps(obj,ensure_ascii=False))

if not os.path.isdir(dir):
  raise 'no such dir'
# all the files in dir
for file in os.listdir(dir):
  filePath=os.path.join(dir,file)
  fileSize=os.path.getsize(filePath)
  # files smaller than 9000 bytes
  if(fileSize <= 9000):
    inputFile=open(filePath,'r')
    total_content=inputFile.read();
    saveStrAsJsonFile(getFileName(file),total_content)
    # files not sammer than 9000 bytes
  else:
    with open(filePath) as bigFile:
      # start counting 
      count_byte=0
      count_content =''
      count_file=1
      for line in bigFile:
        lineByteCount = len(line.encode('utf-8'))
        if(count_byte + lineByteCount >= 9000):
          # save count_content as json file
          saveStrAsJsonFile(getFileName(file,count_file),count_content,str(count_file))
          # reset count data
          count_byte = 0
          count_content = line
          count_file += 1
        else:
          count_byte += lineByteCount
          count_content += line
      else:
        saveStrAsJsonFile(getFileName(file,count_file),count_content,str(count_file))

