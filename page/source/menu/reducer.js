// state:articles,page,pageStep,
export default (state=[],action) => {
  let page = 0;
  switch(action.type){
    case 'index':
      let articleReverse = action.data.map( (item,index) => ({...item,article_id:index}) );
      articleReverse.reverse();
      return {
        ...state,
        articles: articleReverse ,
      };
    case 'page':
      page = action.data;
      return {...state,
        articles: [...state.articles],
        page:page,
      }
    default:
      return state;
  }
}