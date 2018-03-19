import React from 'react';
import {connect} from 'react-redux';
import Remarkable from 'remarkable';

class Unconnect_EditText extends React.Component{
  constructor(props){
    super(props);
    this.refText = this.refText.bind(this);
  }

  caculateScroll(node,scale){
    let height = node.scrollHeight - $(node).height();
    return scale * height;
  }

  refText(node){
    this.node = node;
    //let $node = $(node);
    const getScale = () => {
      let top = $(node).scrollTop();
      let height = node.scrollHeight - $(node).height();
      return top/height;
    }
    let _this = this;
    //$(node).scroll( ()=>console.log( getScale() ) );
    $(node).scroll( () => {
      _this.props.setScrollScale(getScale());
    } )
  }
  componentWillUnMount(){
    $(this.node).unbind();
  }
  render(){
    let {
      'content' : content,
      'setContent':setContent,
      'scrollScale':scrollScale,
    } = this.props;

    if( this.node !== undefined ){
      let h = this.caculateScroll(this.node,scrollScale);
      $(this.node).scrollTop(h);
    }

    return (< div className='editor_editor_outside' >
      <textarea 
        ref={this.refText}
        value={content} 
        onChange={setContent} 
        className='editor_editor_inside'/>
    </div>)
  }
}

const unconnect_EditText = ({content,setContent}) => {
  return (< div className='editor_editor_outside' >
    <textarea value={content} onChange={setContent} className='editor_editor_inside'/>
  </div>)
}

const mapStoP_EditText = state => ({
  content  :  state.editor.content ,
  scrollScale : state.editor.scrollScale,
})

const mapDtoP_EditText = dispatch => ({
  setContent : ev => dispatch(sendData( { 'content' : ev.target.value, } ) ),
  setScrollScale : scrollScale => dispatch({
    type : 'setKeyValue',
    data : {
      'scrollScale' : scrollScale,
    }
  })
});

//const EditText = connect(mapStoP_EditText,mapDtoP_EditText)(unconnect_EditText);
const EditText = connect(mapStoP_EditText,mapDtoP_EditText)(Unconnect_EditText);

export default EditText;
