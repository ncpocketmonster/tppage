import React from 'react';
import Remarkable from 'remarkable';
import {connect} from 'react-redux';

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

class MarkUp extends React.Component{
  constructor(props){
    super(props);
    this.refText = this.refText.bind(this);
  }

  caculateScroll(node,scale){
    let height = node.scrollHeight - $(node).height();
    return scale * height;
  }

  refText(fatherNode){
    let $node = $(fatherNode).children('div');
    let node = $node[0];
    this.node = node;
    //let $node = $(node);
    const getScale = () => {
      let top = $(node).scrollTop();
      let height = node.scrollHeight - $(node).height();
      return top/height;
    }
    let _this = this;
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
    let md = new Remarkable();
    let rendered = md.render( content );
    return ( <div className='editor_editor_outside'
        ref = {this.refText} >
      <div 
        dangerouslySetInnerHTML={{__html:rendered}}
        className='markdown editor_editor_inside'>
      </div>
    </div>);
  }
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
const EditText = connect(mapStoP_EditText,mapDtoP_EditText)(MarkUp);

export default EditText;