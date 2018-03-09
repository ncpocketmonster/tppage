import React from 'react';
import {BrowserRouter,Link,Route,Router,Switch,} from 'react-router-dom';
import {connect,} from 'react-redux';
import Remarkable from 'remarkable';

import PPPP from './page.js';
import {getIndex} from './../actions.js';
import './menu.scss';

/** 
 * dispatch: getArticleData,
 * state: articles,page,
*/
class Menu extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.getIndex();
  }

  render(){
    const getClassName = index => ('bg_color_'+(index%16)+'  menu_item')
    const itemToMenuDiv = (item,index) => (
      <li  key={index}> 
        <Link to={'/app/article/'+item.aid} className={getClassName(index)}>
          <h1 className='menu_title'>{item.article_id+' '+item.title}</h1>
          <i className='menu_time'>{item.update_time}</i>
          <p className='menu_content'>{item.content}</p>
        </Link>
      </li>
    );

    //console.log(this.props);
    let list = this.props.index;

    const LinkList = () => (
      <div className='container menu_div'>
        <PPPP/>
        <ul id='menu_list'>
          {list.map(itemToMenuDiv)}
        </ul>
        <PPPP/>
      </div>
    )

    return (
      <LinkList/>
    )
  }
}

const mapDispatchToProps = d => ({
  getIndex:()=>d(getIndex()),
})

const mapStateToProps = state => {
  let {'articles':articles,'page':page,'step':step}= state.menu;
  let index = articles.slice(page*step,(page+1)*step);
  return { index:index, };
};

export default connect(mapStateToProps,mapDispatchToProps)(Menu);