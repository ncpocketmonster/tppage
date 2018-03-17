import {url} from '../const.js';

// unchecked getCookie function, mabye it is wrong
const getCookie = arr => {
  let str = document.cookie;
  let spstr = str.split(';');
  let key='',value='';
  let obj= {},result={};
  for(let i in spstr){
    [key,value] = spstr.split('=');
    result[key] = value;
  }
  for(let i in arr){
    key=arr[i];
    if(obj[key]!==undefined){
      result[key]=obj[key];
    }
    else{
      return false;
    }
  }
  return result;
}

const addUAndP = str => {
  let obj = str ? JSON.parse(str) : {};
  obj.username = localStorage.username;
  obj.password = localStorage.password;
  return JSON.stringify(obj);
}

/*
get /api/article for example
[ {
    "aid":105,
    "title":"eee",
    "author":"bb",
    "keyword":["old,classical,masterpieces"],
    "article_type":"literature",
    "content":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "create_time":"2018-03-03 20:12:45",
    "update_time":"2018-03-03 20:12:45"},
  {
    "aid":106,
    "title":"rrrr",
    "author":"dd",
    "keyword":["old,classical,masterpieces"],
    "article_type":"markdown",
    "content":"ccccccccccccccccccccccccccccccccccccccc",
    "create_time":"2018-03-03 20:12:45",
    "update_time":"2018-03-03 20:12:45"}, ]
then return it as data directly(type:'index')
*/
export const getIndex = () => dispatch => {
  fetch( url.article ,{method:'GET'})
  .then( resp => resp.json())
  .then( d => dispatch({type:'index',data:d}));
}

/*
get /api/article/108 for example
{
  "aid":108,
  "title":"1",
  "author":"v",
  "keyword":["old,classical,masterpieces"],
  "article_type":"literature",
  "content":"qwerty",
  "create_time":"2018-03-03 20:12:45",
  "update_time":"2018-03-03 20:12:45"
}
then return it as data directly(type:'get')
*/
let dataToState = data => {
  let arr=['content','title','aid','author'];
  let res = {};
  arr.forEach( item => {
    res[item] = data[item];
  } );
  res.type    = data.article_type;
  return res;
}

export const get = id => dispatch => {
  //console.log(id);
  fetch( url.articleId(id),{method:'GET'})
  .then( resp => resp.json() )
  .then( d => dispatch({type:'get',data: dataToState(d)}) );
};      

// tell the server to create a new file, 
// then the server return the id of the new file,
export const post     = input => dispatch => {
  let str = addUAndP(input);
  console.log(str);
  fetch( url.article , {method:'POST',body:str,contentType:"application/json"})
  .then( resp => resp.json() )
  .then( d => dispatch({type:'post',data: d }));
};  

export const put      = (id,input) => dispatch => {
  let str = addUAndP(input);
  fetch( url.articleId(id),{method:'PUT',body:str, } )
  .then( resp => resp.json() )
  .then( d => dispatch({'type':'put','data':d}) );
}; 

export const del      = id => dispatch => {
  let str = addUAndP();
  var r=confirm("Delete?");
  if (r==true)
  {
    fetch( url.articleId(id),{method:'DELETE',body:str} )
    .then( resp => resp.json() )
    .then( d => dispatch({type:'del',data:{'aid':id}}) );
  }
};    

// set key value
export const sendData = data => ({
  type:'setKeyValue',
  data: data,
})

export const clear = () => ({
  type : 'clear' ,
})

export const reverseItem = () => ({
  type : 'reverseItem',
})