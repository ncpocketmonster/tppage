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
      return {...state,catelog:data,};
    case('get'):
      //console.log('get',data);
      //let z = {...data,...state};
      //let y = {...state,...data};
      //console.log('date first',z);
      //console.log('state first',y);
      return {...state,...data,};
    case('put'):
      let item = {
        'id':data.id,
        'title':state.title,
      };
      return {...state,
        'index':state.index.push(item),
      };
    case('del'):
      let newIndex = state.index.filter( item => item.id != state.id );
      return {...state,
        'index' : newIndex ,
      };
    case('post'):
      return state;
    case('setKeyValue'):
      return {...state , ...data};
    default:
      return state;
  }
  return state;
}