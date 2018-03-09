import React from 'react';
import {connect} from 'react-redux';

import {setPage} from './../actions.js';

const range = (a,b)=>{
  if(typeof(a) !== 'number' || typeof(b) !== 'number' || a>b){
    throw 'a,b should be both number,and a<=b';
  }
  let arr=[];
  for(let i=a;i<=b;i++){
    arr.push(i);
  }
  return arr;
}

/**
 * @param thisPage  : page number of the page on the screen
 * @param totalPage : how many pages 
 * {thisPage,totalPage,setPage,hideMiddle}
 */
class PPPP extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let {
      'thisPage'  : thisPage,
      'firstPage' : firstPage,
      'totalPage' : totalPage,
      'setPage'   : setPage,
    } = this.props;

    let prePages  = thisPage-3<firstPage ? firstPage : thisPage-3;
    let postPages = thisPage+3>totalPage ? totalPage : thisPage+3;
    console.log(totalPage,thisPage);
    console.log(prePages,postPages);

    const bgColor = (item,thisPage) => ( item === thisPage ? {'backgroundColor':'blue'} : {'backgroundColor':'whire'});

    const PageLinks = () => 
      range(prePages,postPages).map( 
        (item,index)=>( <button  
          key={index} 
          style={bgColor(item,thisPage)}
          onClick={()=>setPage(item)}
          >{item}</button>
    ) );

    const GoNextPage = ()=> ( thisPage === totalPage ? 
        (<button type='button' disabled>Next</button>): 
        (<button type='button' onClick={()=>setPage(thisPage+1)}>Next</button>))

    const GoPreviousPage = ()=> ( thisPage === firstPage ? 
        (<button type='button' disabled>Previous</button>): 
        (<button type='button' onClick={()=>setPage(thisPage-1)}>Previous</button>))

    return (<div>
      <GoPreviousPage className='pagePrevious'/>
      <PageLinks className='pageLinks'/>
      <GoNextPage className='pageNext'/> 
    </div>)
}

}
const mapStoP = state => {
  let totalP = Math.ceil(state.menu.articles.length / state.menu.step )-1;
  totalP = totalP > 0 ? totalP : 0;
  return {
    totalPage : totalP,
    thisPage  : state.menu.page,
    firstPage : state.menu.firstPage,
}}

const mapDtoP = dispatch => ({
  setPage:num => dispatch(setPage(num)),
})

export default connect(mapStoP,mapDtoP)(PPPP);