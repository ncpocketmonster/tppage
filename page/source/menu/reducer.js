export default (state=[],action) => {
  switch(action.type){
    case 'index':
      return action.data;
    default:
      return state;
  }
}