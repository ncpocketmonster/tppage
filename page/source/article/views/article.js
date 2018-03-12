import React      from 'react';
import {connect,} from 'react-redux';
import {getById}  from './../actions.js';
import Remarkable from 'remarkable';

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
    let getMarkup = (text) => {
      const md = new Remarkable();
      return {__html:md.render(text)};
    }
    let getContent = () => {
      switch(this.props.type){
        case 'literature':
          return (<div> {splited_content.map( (text,k) => <p key={k} >{text}</p>)}</div>);
        case 'markdown':
          return <div className='markdown' dangerouslySetInnerHTML={getMarkup(content)}/>
        default:
          return (<div> {splited_content.map( (text,k) => <p key={k} >{text}</p>)}</div>);
      }
    }

    return (<div className='container  article_all'>
      <h1>{title}</h1>
      {getContent()}
    </div>)
  }
}

const mapDtoP = d => ({
  getById : id => d(getById(id)),
});

const mapStoP = s => ({
  title   : s.article.title,
  content : s.article.content,
  type    : s.article.article_type,
});

export default connect(mapStoP,mapDtoP)(Article);