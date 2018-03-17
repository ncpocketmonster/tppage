/**
 * action types:
 *   getIndex
 *   get
 *   post
 *   put
 *   del
 *   deny
 */
export default (state={},action) => {
  let {'data':data,'type':type} = action;
  //console.log('state:',state,'@@@ action:',action);
  switch(type){
    case('index'):
      return {...state,
        catelog: state['reverseItem'] ? data.reverse() : data,
      };
    case('get'):
      return {...state,...data,};

    case('put'):
      alert('修改成功');
      return state;

    case('del'):
      alert('删除成功');
      let delIndex = 0;
      // 从原目录中删除用户点击的那一篇文章
      let catelogAfterDel = state.catelog.filter( (item,index) => {
        if(  item.aid === data.aid ){
          delIndex = index;
          return false;
        }
        return true;
      })
      let aidAfterDel = catelogAfterDel[ catelogAfterDel.length - 1 ].aid;
      let pageAfterDel = Math.ceil( catelogAfterDel.length / state.step );
      // 如果被删除的那一篇文章后面还有文章，指向它,不然指向最后一篇
      if( delIndex < (catelogAfterDel.length - 1) ){
        aidAfterDel  = catelogAfterDel[delIndex].aid;
        pageAfterDel = Math.ceil( ( delIndex + 1 ) / state.step ) 
      }
      return {...state,
        'aid'    : aidAfterDel     ,
        'page'   : pageAfterDel    ,
        'catelog': catelogAfterDel ,
      };

    case('post'):
      alert('新建成功');
      data.aid = parseInt(data.aid);
      let newCatelog = state.catelog.concat(data);
      let newAid     = data.aid;
      let newPage    = Math.ceil( newCatelog.length  / state.step );

      return {...state,
        'aid'  : newAid  ,
        'page' : newPage ,
        'catelog' : newCatelog ,
      };

    case('setKeyValue'):
      return {...state , ...data};

    case('clear'):
      return {...state,
        'title'   : '',
        'content' : '',
      }

    case('reverseItem'):
      let len = state.catelog.length - 1;
      let nextCatelog = [];
      let nextPage = state.page;
      if(len !== -1){
        nextCatelog = state.catelog.map((item,index) => state.catelog[ len - index ]);
        nextPage = Math.ceil( len / state.step ) + state.firstPage - state.page;
      }
      return {...state,
        'reverseItem' : !state['reverseItem'] ,
        'catelog'     : nextCatelog           ,
        'page'        : nextPage ,
      }
    default:
      return state;
  }
  return state;
}