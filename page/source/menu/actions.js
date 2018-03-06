export const getIndex = () => dispatch => {
  fetch('/api/article',{method:'GET'})
  .then( resp => resp.json())
  .then( d => dispatch({type:'index',data:d}));
}