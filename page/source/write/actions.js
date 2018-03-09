import {url} from '../const.js';
import sha512 from 'crypto-js/sha512';

export const post = obj => dispatch => {
  // use sha512 to hash the password 
  const salt = '123!@!#asdf@:"><>'
  /*
  const hash = str => sha512( str + salt ).toString() ;
  console.log('123',sha512('123').toString());
  let nextObj = obj;
  nextObj.hash =  hash(obj.password) ;
  console.log(nextObj);
  */

  fetch(url.write.actionUrl,{
    method:'POST',
    body:JSON.stringify(obj)})
  .then( resp => resp.json())
  .then( d=> dispatch({
    type:'post',
    data:d.check,
  }))
  .catch( () => dispatch({
    type:'post',
    data:'post article fail',
  }));
};

export const write = data => ({
  type:'write',
  data:data,
});