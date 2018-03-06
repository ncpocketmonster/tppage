import React from 'react';

class Title extends React.Component{
  constructor(props){
    super(props);
    this.state={
      val:'',
      textState:true,
      errorMessage:'123123',
    };
    this.onChange=this.onChange.bind(this);
    this.clear=this.clear.bind(this);
  }
  // clear words in the input box 
  clear(){
    this.setState({val:'',textState:true});
  }
  onChange(ev){
    let message = ev.target.value;
    if(message.length > 30){
      this.setState({textState:false,errorMessage:'no more than 30 words'});
    }
    else{
      this.setState({val:ev.target.value,textState:true});
      console.log(this.state.textState);
    }
  }
  render(){
    let show = {display:'block'};
    let hide = {display:'hide'};
    return (
      <div className='writing_item'>
        <input  className='one' disabled='disabled' defaultValue='title' name='title_span'/>
        <input  className='two' type='text' onChange={this.onChange}name='title_text' value={this.state.val}/>
        <button className='three'onClick={this.clear}>clear</button>
        { this.state.textState ? null : <p>{this.state.errorMessage}</p> }
      </div>
    )
  }
}

export default Title;