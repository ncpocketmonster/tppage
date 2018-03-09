/*
state
{ content: ; postState: ; postTime: ; }
action
{type:post,data:success/fali}
{type:write,data:'xxx'}
*/
export default (state={},action) => {
  let { 'data':data, 'type':type, } = action;
  let result = {};
  switch( type ){
    case 'write':
      result = {...state};
      result[data.key] = data.value;
      return result;
    case 'post':
      if(data === false){
        alert('authority denied');
        return state;
      }
      else{
        alert('post ok');
        return {...state , postState:data, postTime:Date()};
      }
    case 'password':
      return {...state,password:data};
    default:
      return state;
  }
}