import React from 'react';
import {connect} from 'react-redux';
import {getIndex,sendData} from './../action.js';

import './editor.scss';

class Page extends React.Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this.props.getIndex();
  }
  render(){
    let {
      'page'      : page,
      'length'    : length,
      'step'      : step,
      'pageWidth' : pageWidth,
    } = this.props;

    const range = (a,b) => {
      let result = [];
      for( let i = a; i <= b ; i++ ){
        result.push(i);
      }
      return result;
    }

    // caculate page range
    let arr       = [];
    let firstPage = this.props.firstPage;
    let lastPage  = Math.ceil( length / step );
    let halfWidth = Math.floor( pageWidth / 2 );

    if( lastPage <= pageWidth ){
      arr = range( firstPage , lastPage );
    }
    else{
      if( page - halfWidth < firstPage ){
        arr = range( firstPage , pageWidth );
      }
      else if( page + halfWidth > lastPage ){
        arr = range( lastPage - pageWidth + 1 , lastPage );
      }
      else{
        arr = range( page - halfWidth , page + halfWidth );
      }
    }
    // arr is page range array

    //console.log(arr);
    //console.log(pageWidth);

    //console.log(firstPage);
    //console.log(lastPage);
    //console.log(page);
    //console.log(startPage);
    //console.log(endPage);
    //console.log(arr);

    let stNormal = {'backgroundColor':'white'};
    let stFocus  = {'backgroundColor':'#eaf0fb'};
    const mapFunc = (item,index) => (<button 
      className='editor_page_button'
      type='button' 
      key={index} 
      onClick={()=>this.props.setPage(item)} 
      style={ item === page ? stFocus : stNormal }>
      {item} 
    </button>)

    return (<div className='editor_page'>
      {arr.map( mapFunc )}
    </div>)
  }
};

const mapStoP = state => ({
  'page'      : state.editor.page     ,
  'firstPage' : state.editor.firstPage,
  'length'    : state.editor.catelog.length,
  'step'      : state.editor.step,
  'pageWidth' : state.editor.pageWidth,
});

const mapDtoP = dispatch => ({
  getIndex : () => dispatch(getIndex()),
  setPage  : page => dispatch(sendData({'page':page})),
})

export default connect(mapStoP,mapDtoP)(Page);