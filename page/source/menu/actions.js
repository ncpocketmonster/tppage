export const getIndex = () => dispatch => {
  fetch('/api/article',{method:'GET'})
  .then( resp => resp.json())
  .then( d => dispatch({type:'index',data:d}));
}

export const setPage = pageId => {
  return {
    type:'page',
    data:pageId,
  } 
}

export const setStep = step => ({type:'step',data:step});