import React      from 'react';
import Remarkable from 'remarkable';
import {connect}  from 'react-redux';
import {sendData} from './../action.js';

import './markdown.scss'  ;
import './editor.scss'    ;

  const st = {
    float    : 'left'    ,
    display  : 'block'   ,
    width    : '49.9%'     ,
    margin   : '0px'     ,
    height   : '100%'    ,
    overflowY: 'scroll'  ,
    margin   : 'auto'    ,
    overflowX: 'hidden'  ,
    wordBreak: 'breakAll',
    border   : 'none',
  }

const unconnect_EditText = ({content,setContent}) => {
  return (< div className='editor_editor_outside' >
    <textarea value={content} onChange={setContent} className='editor_editor_inside'/>
  </div>)
}

const mapStoP_EditText = state => ({
  content  :  state.editor.content ,
})

const mapDtoP_EditText = dispatch => ({
  setContent : ev => dispatch(sendData( { 'content' : ev.target.value, } ) ),
});

const EditText = connect(mapStoP_EditText,mapDtoP_EditText)(unconnect_EditText);

const Editor = ({setContent,content,type,mode}) => {
  const MarkedUp  = () => {
    let md = new Remarkable();
    let rendered = md.render( content );
    return ( <div className='editor_editor_outside'>
      <div 
        dangerouslySetInnerHTML={{__html:rendered}}
        className='markdown editor_editor_inside'>
      </div>
    </div>);
  }

  const PlainText = () => {
    let arr = [];
    arr = content.split('\n');
    return (<div className='editor_editor_inside'>{arr.map( (item,index) => (<p key={index}>{item}</p>) )}</div>);
  } 

  if( type === 'literature' && mode === 'edit'){
    return (<EditText/>)
  }
  else if( type === 'literature' && mode === 'view'){
    return (<PlainText />)
  }
  else if( type === 'markdown' && mode === 'edit'){
    return (<div>
      <EditText/>
      <MarkedUp/>
    </div>)
  }
  else if( type === 'markdown' && mode === 'view'){
    return (<MarkedUp />)
  }
  else{
    return (<EditText />)
  }
}

const mapStoP = state => ({
  content  :  state.editor.content ,
  type     :  state.editor.type    ,
  mode     :  state.editor.mode    ,
});

export default connect( mapStoP )( Editor );