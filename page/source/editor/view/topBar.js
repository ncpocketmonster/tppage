import React from 'react';
import { connect } from 'react-redux';
import { 
  sendData , 
  put      , 
  del      ,  
  post     ,
  clear    ,
  reverseItem,
} from './../action.js';
import './editor.scss';

const TopBar = ({aid,title,content,type,setTitle,del,put,post,clear,reverseItem,reverseState}) => {
  
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

  let reverseClassName = reverseState ? 'editor_top_bar_button_down' : 'editor_top_bar_button';
  return (
  <div className='editor_top_bar'>
    <div className='editor_top_bar_buttons' >
      <button onClick = { () => post( makeNew() )       } className='editor_top_bar_button'  > 新建    </button>
      <button onClick = { () => put ( aid , makeStr() ) } className='editor_top_bar_button'  > 保存    </button> 
      <button onClick = { () => clear( )                } className='editor_top_bar_button'  > 清空    </button> 
      <button onClick = { () => del ( aid )             } className='editor_top_bar_button'  > 删除    </button> 
      <button onClick = { () => reverseItem()           } className={reverseClassName     }  > 倒序    </button> 
      <button onClick = { () => {}                      } className='editor_top_bar_button2' > 滚动锁定 </button> 
    </div>
    <div className='editor_top_bar_title'>
      <input 
        type='text' 
        value={title} 
        onChange={setTitle} 
        style={{
          height   : '100%' ,
          width    : '100%' ,
          fontSize : '20px' ,
      }}/>
    </div>
  </div>)
}

const mapStoP = state => ({
  title   : state.editor.title    ,   
  content : state.editor.content  ,
  type    : state.editor.type     , 
  aid     : state.editor.aid      , 
  reverseState : state.editor.reverseItem ,
});

const mapDtoP = dispatch => ({
  setTitle    :   ev          => dispatch( sendData   ({ 'title' : ev.target.value, })),
  del         :   id          => dispatch( del        (id         ) ),
  put         : ( aid , str ) => dispatch( put        ( aid , str ) ),
  post        : (       str ) => dispatch( post       (       str ) ),
  clear       : (           ) => dispatch( clear      (           ) ),
  reverseItem : (           ) => dispatch( reverseItem(           ) ),
});

export default connect(mapStoP,mapDtoP)(TopBar);