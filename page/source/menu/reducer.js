// state:articles,page,pageStep,
export default (state=[],action) => {
  let page = 0;
  switch(action.type){
    case 'index':
      return {
        ...state,
        articles:action.data.map( (item,index) => ({...item,article_id:index}) ),
      };
    case 'page':
      page = action.data;
      console.log('reducer',page);
      return {...state,
        articles: [...state.articles],
        page:page,
      }
    default:
      return state;
  }
}