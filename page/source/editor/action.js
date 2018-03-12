import {url} from '../const.js';

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

export const post     = str => dispatch => {
  fetch( url.article , {method:'POST',body:str})
  .then( resp => resp.json() )
  .then( d => dispatch({type:'post',data:d}));
};  

export const put      = (id,str) => dispatch => {
  fetch( url.articleId(id),{method:'PUT',body:str} )
  .then( resp => resp.json() )
  .then( d => dispatch({type:'put'}) );
}; 

export const del      = id => dispatch => {
  fetch( url.articleId(id),{method:'DELETE'} )
  .then( resp => resp.json() )
  .then( d => dispatch({type:'del'}) );
};    

// set key value
export const sendData = data => ({
  type:'setKeyValue',
  data: data,
})