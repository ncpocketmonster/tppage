import React     from 'react'           ;
import {connect} from 'react-redux'     ;
import {get}     from './../action.js'  ;
import './editor.scss';

const FileItem = ({get,catelog,page,step,aid}) => {
  let start = ( page - 1 ) * step ;
  let end   = page * step < catelog.length ? page * step - 1 : catelog.length - 1 ;

  const styFocus  = {'backgroundColor' : '#eaf0fb'  };
  const styNormal = {'backgroundColor' : 'white'};

  const mapFunc = ( item , index ) => (<li key={index} className="editor_li"
    onClick = {() => get(item.aid)}
    style = { item.aid === aid ? styFocus : styNormal }>
    {item.title}
  </li>)
    //{`aid:${item.aid},key:${index},title:${item.title}`}

  return (<div>
    <ul className='list_ul'>
      { catelog.slice( start , end + 1 ).map( mapFunc )}
    </ul>
  </div>)
}

const mapStoP = state => ({
  'catelog'  : state.editor.catelog , 
  'page'     : state.editor.page    ,
  'step'     : state.editor.step    ,
  'aid'      : state.editor.aid     ,
});

const mapDtoP = dispatch => ({
  'get'      : aid => dispatch(get(aid))  ,
});

export default connect(mapStoP,mapDtoP)(FileItem);