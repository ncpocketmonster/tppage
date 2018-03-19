import React      from 'react';
import Remarkable from 'remarkable';
import {connect}  from 'react-redux';
import {sendData} from './../action.js';

import './markdown.scss'  ;
import './editor.scss'    ;


/*
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
*/
  /*
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
  */

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.refMark = this.refMark.bind(this);
    this.refText = this.refText.bind(this);
    this.state = {
      scrollScale : 0,
    };
    this.scrollTag = null;
    this.timer = null;
    this.tagLock= this.tagLock.bind(this);
    this.allNode = [];
  }

  // scale : scrolled height / scrollable height
  getScale(node){
    let top = $(node).scrollTop();
    let height = node.scrollHeight - $(node).height();
    return top/height;
  }

  setScrollTop(node){
    let scale = this.state.scrollScale;
    let height = node.scrollHeight - $(node).height();
    let scaledHeight = scale * height;
    $(node).scrollTop( scaledHeight );
  }
  
  tagLock(tag){
    let duration = 100;
    if(this.scrollTag === null){
      this.scrollTag = tag;
    }
    if(this.scrollTag === tag){
      clearTimeout(this.timer);
      this.timer = setTimeout( () => { this.scrollTag = null; } ,duration);
      return true;
    }
    return false;
  }

  refMark(fatherNode){
    let $node = $(fatherNode).children('div');
    let node = $node[0];
    this.allNode.push(node);
    let _this = this;
    $(node).scroll( () => {
      if( _this.tagLock('mark') ){
        _this.setState({'scrollScale' : _this.getScale(node)});
      }
    })
  }

  refText(node){
    this.allNode.push(node);
    let _this = this;
    $(node).scroll( () => {
      if( _this.tagLock('text') ){
        _this.setState({'scrollScale' : _this.getScale(node)});
      }
    })
  }

  componentWillUnMount(){
    for(let i in this.allNode){
      $(this.allNode[i]).unbind();
    }
  }

  render(){


    let {
      'content' : content ,
      'type' : type, 
      'mode' : mode,
      'setContent' : setContent,
      'lockScroll' : lockScroll,
    } = this.props;

    //console.log(lockScroll,type);

    if(this.allNode.length === 2 && (lockScroll === true) && type==='markdown'){
      for(let i in this.allNode){
        this.setScrollTop(this.allNode[i]);
      }
    }

    // pure text without markdown
    const PlainText = () => {
      let arr = [];
      arr = content.split('\n');
      return (<div className='editor_editor_inside'>
        {arr.map( (item,index) => (<p key={index}>{item}</p>) )}
      </div>);
    } 

    // markdown parser
    let md = new Remarkable();
    let rendered = md.render( content );

    if(type === 'literature'){
      return (<PlainText/>);
    }
    else{
      return (<div>
        <div className='editor_editor_outside' >
          <textarea 
            ref={this.refText}
            value={content} 
            onChange={setContent} 
            className='editor_editor_inside'/>
        </div>
        <div className='editor_editor_outside' ref = {this.refMark} >
          <div 
            dangerouslySetInnerHTML={{__html:rendered}}
            className='markdown editor_editor_inside'> 
          </div>
        </div>
      </div>)
    }
  }
}

const mapStoP = state => ({
  content  :  state.editor.content ,
  type     :  state.editor.type    ,
  mode     :  state.editor.mode    ,
  lockScroll : state.editor.lockScroll,
});

const mapDtoP = dispatch => ({
  setContent : ev => dispatch(sendData( { 'content' : ev.target.value, } ) ),
});


export default connect( mapStoP , mapDtoP )( Editor );