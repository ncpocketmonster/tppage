import React from 'react';
import { connect } from 'react-redux';
import { 
  sendData , 
  put      , 
  del      ,  
  post     ,
} from './../action.js';
import './editor.scss';

const TopBar = ({aid,title,content,type,setTitle,del,put,post}) => {
  
  const makeStr = () => (JSON.stringify({
    'title'   : title   ,
    'content' : content ,
    'article_type'    : 'markdown',
  }));

  const makeNew = () => (JSON.stringify({
    'title'   : 'new empty file' ,
    'content' : 'new empty file' ,
    'article_type'    : 'markdown',
  }));

  return (
  <div style={{
      position : 'relative' ,
      height   : '60px',
      overflow     : 'hidden' ,
    }}>
    <div style={{
      width : '250px',
      float : 'right',
      position : 'relative',
      overflow     : 'hidden' ,
    }}>
      <button onClick = { () => {}                      } className='editor_top_bar_button'> 倒序    </button> 
      <button onClick = { () => post( makeNew() )       } className='editor_top_bar_button'> 新建    </button>
      <button onClick = { () => put ( aid , makeStr() ) } className='editor_top_bar_button'> 保存    </button> 
      <button onClick = { () => {}                      } className='editor_top_bar_button'> 清空    </button> 
      <button onClick = { () => del ( aid )             } className='editor_top_bar_button'> 删除    </button> 
    </div>
    <div style={{ height : '100%', paddingRight : '250px', }}>
      <input typp='text' value={title} onChange={setTitle} style={{
        height : '100%',
        width  : '100%',
        fontSize : '20px',
      }}/>
    </div>
  </div>)
}

const mapStoP = state => ({
  title   : state.editor.title    ,   
  content : state.editor.content  ,
  type    : state.editor.type     , 
  aid     : state.editor.aid      , 
});

const mapDtoP = dispatch => ({
  setTitle : ev => dispatch(sendData({ 'title' : ev.target.value, })),
  del      : id => dispatch( del (id) ),
  put      : ( aid , str ) => dispatch( put ( aid , str ) ),
  post     : (       str ) => dispatch( post(       str ) ),
});

export default connect(mapStoP,mapDtoP)(TopBar);