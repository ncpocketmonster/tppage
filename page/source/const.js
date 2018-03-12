const url = {
  'write':{
    'actionUrl':'/api/article',
    'actionMethod':{'method':'POST'},
    'link':'/app/write',
  },
  'articleId' : id => ('/api/article/'+id),
  'article'   : '/api/article',
};

export {url};