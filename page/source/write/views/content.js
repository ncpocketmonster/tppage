import React,{Component} from 'react' ;
import {connect} from 'react-redux';
import Remarkable from 'remarkable';

import {write,post} from './../actions.js';

class Content extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(ev){
    //let val = this.state.essay + ev.target.value;
    //this.setState({essay:val});
    this.props.write(ev.target.value);
  }

  getMarkup(){
    const md = new Remarkable();
    return {__html:md.render(this.props.content)};
  }

  render(){
    /*
    attention: keywords in state.write object is called
    keyword here, because in the server and the 
    Mysql database, the key name is "keyword" instead of "keywords"
    */
    let obj = {
      password : this.props.password,
      content  : this.props.content,
      title    : this.props.title,
      keyword : this.props.keywords, 
      article_type : 'markdown',
      author : 'ncpocketmonster',
    }
    return  <div className='article_container'>
      <h4 id='article_item_0'>input</h4>
      <textarea onChange={ ev =>this.props.write({key:'content',value:ev.target.value})} id='article_item_2'/>
      <h4 id='article_item_1'>output</h4>
      <div className='content markdown' dangerouslySetInnerHTML={this.getMarkup()} id='article_item_3'/>
      <button type='button' onClick={()=>{ this.props.post(obj);}}>submit</button>
    </div>
  }
}

const mapStoP = state => ({
  password : state.write.password,
  content  : state.write.content,
  title    : state.write.title,
  keywords : state.write.keywords, 
});

const mapDtoP = dispatch => ({
  write : data => dispatch(write(data)),
  post  : obj  => dispatch(post(obj)),
});

export default connect(mapStoP,mapDtoP)(Content);