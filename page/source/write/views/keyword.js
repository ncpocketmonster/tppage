import React from 'react';

class Keyword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:'',
      inputs:['12','34','56','78','90'],
    };
    this.delete=this.delete.bind(this);
    this.add=this.add.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  delete(key){
    let nextInputs=this.state.inputs.filter((item,index)=>key!==index);
    this.setState({inputs:nextInputs});
    console.log(this.state.inputs);
  }

  add(){
    let nextInputs=this.state.inputs.concat([this.state.text]);
    this.setState({inputs:nextInputs});
    console.log(this.state.inputs);
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
        <button className='three' onClick={this.add}>add</button>
      </div>
      <div className='keyword_top'>
        {this.state.inputs.map( (val,key) => <div key={key} className='keyword_div'>
          <p className='keyword_p'>{val}</p>
          <button className='keyword_button'style={pstyle} onClick={()=>this.delete(key)}>x</button>
        </div> )}
      </div>
    </div>
  }
}

export default Keyword;