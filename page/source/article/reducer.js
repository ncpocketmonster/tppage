export default (state={},action) => {
  switch(action.type){
    case 'article':
      return action.data;
    default:
      return state;
  }
}