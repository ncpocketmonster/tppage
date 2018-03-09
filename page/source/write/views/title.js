import React from 'react';

class Title extends React.Component{
  constructor(props){
    super(props);
    //this.state={ val:'', textState:true, errorMessage:'123123', };
    this.onChange=this.onChange.bind(this);
    this.clear=this.clear.bind(this);
  }
  // clear words in the input box 
  clear(){
    //this.setState({val:'',textState:true});
    this.props.write('');
  }
  onChange(ev){
    let value = ev.target.value;
    if(value.length > 30){
      alert('no more than 30 words');
      //this.setState({textState:false,errorMessage:'no more than 30 words'});
    }
    else{
      this.props.write( value );
      //this.setState({val:ev.target.value,textState:true});
    }
  }
  render(){
    return (
      <div className='writing_item'>
        <input  className='one' disabled='disabled' defaultValue='title' name='title_span'/>
        <input  className='two' type='text' onChange={this.onChange}name='title_text' value={this.props.text}/>
        <button className='three'onClick={this.clear}>X</button>
      </div>
    )
  }
}

import {connect} from 'react-redux';
import {write} from './../actions.js';

const mapStoP = state => ({
  text : state.write.title,
});

const mapDtoP = dispatch => ({
  write : text => dispatch({
    'type'  : 'write',
    data:{
      'key'   : 'title',
      'value' : text  ,
    }
  })
})

export default connect(mapStoP,mapDtoP)(Title);
//{ this.state.textState ? null : <p>{this.state.errorMessage}</p> }
/*
let show = {display:'block'};
let hide = {display:'hide'};
*/