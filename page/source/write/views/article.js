import React,{Component} from 'react' ;
import Remarkable from 'remarkable';

class Writing extends Component {
  constructor(props){
    super(props);
    this.getMarkup = this.getMarkup.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state={essay:''};
  }
  
  onChange(ev){
    //let val = this.state.essay + ev.target.value;
    //this.setState({essay:val});
    console.log('onInput');
    this.setState({essay:ev.target.value});
  }

  getMarkup(){
    const md = new Remarkable();
    return {__html:md.render(this.state.essay)};
  }

  render(){
    return  <div className='article_container'>
      <h4 id='article_item_0'>input</h4>
      <textarea onChange={this.onChange}  id='article_item_2'/>
      <h4 id='article_item_1'>output</h4>
      <div className='content' dangerouslySetInnerHTML={this.getMarkup()} id='article_item_3'/>
    </div>
  }
}

export default Writing;