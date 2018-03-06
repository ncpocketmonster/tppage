export const getById = id => dispatch => {
  fetch('/api/article/'+id,{method:'GET'})
  .then( resp => resp.json())
  .then( d => dispatch({type:'article',data:d}));
}