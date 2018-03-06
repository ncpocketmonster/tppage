import React      from 'react';
import {connect,} from 'react-redux';
import {getById}  from './../actions.js';

import './article.scss';

class Article extends React.Component{
  constructor(props){
    super(props);
    this.id = this.props.match.params.id;
  }
  componentWillMount(){
    this.props.getById(this.id);
  }
  render(){
    let {'content':content,'title':title}= this.props;
    let splited_content = content.split(/[\r\n]+/gi);
    return (<div className='container  article_all'>
      <h1>{title}</h1>
      {splited_content.map( (text,k) => 
        <p key={k} >{text}</p>)
      }
    </div>)
  }
}

const mapDtoP = d => ({
  getById : id => d(getById(id)),
});

const mapStoP = s => ({
  title   : s.article.title,
  content : s.article.content,
});

export default connect(mapStoP,mapDtoP)(Article);