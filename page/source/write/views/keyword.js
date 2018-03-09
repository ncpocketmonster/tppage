import React from 'react';

class Keywords extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:'',
    };
    this.delete=this.delete.bind(this);
    this.add=this.add.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  delete(key){
    let nextInputs=this.props.textArray.filter((item,index)=>key!==index);
    //this.setState({inputs:nextInputs});
    this.props.write(nextInputs);
  }

  add(){
    let nextInputs=this.props.textArray.concat([this.state.text]);
    //this.setState({inputs:nextInputs});
    this.props.write(nextInputs);
  }

  onChange(ev){
    this.setState({text:ev.target.value});
  }
  
  render(){
    let pstyle={display:'inline'};
    return <div >
      <div className='writing_item'>
        <input  className='one'  disable='disabled' defaultValue='keyword' name='keyword_span'/>
        <input  className='two'type='text' onChange={this.onChange} name='keyword_text'/>
        <button className='three' onClick={this.add}>+</button>
      </div>
      <div className='keyword_top'>
        {this.props.textArray.map( (val,key) => <div key={key} className='keyword_div'>
          <p className='keyword_p'>{val}</p>
          <button className='keyword_button'style={pstyle} onClick={()=>this.delete(key)}>x</button>
        </div> )}
      </div>
    </div>
  }
}

import {connect} from 'react-redux';
import {write}   from './../actions.js';

const mapStoP = state => ({
  textArray : state.write.keywords,
});

const mapDtoP = dispatch => ({
  write : textArray => dispatch(write({
    'key':'keywords',
    'value':textArray,
  }))
});

export default connect(mapStoP,mapDtoP)(Keywords);