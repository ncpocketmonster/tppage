import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//reducers
import {reducer as menuReducer   } from './menu';
import {reducer as articleReducer} from './article';
import {reducer as writeReducer  } from './write';
import {reducer as editorReducer } from './editor';

const reducer = combineReducers({
  menu    : menuReducer    ,
  article : articleReducer , 
  write   : writeReducer   , 
  editor  : editorReducer  , 
});

const initialValue = {
  menu:{
    articles      : []          ,
    page          : 0           ,
    step          : 12          ,
    firstPage     : 0           ,
  },
  article:{
    title         : 'nothing'   ,
    content       : 'nothing'   ,
  },
  write:{
    content       :'321'        ,
    keywords      :['321']      ,
    title         :'123'        ,
    password      :'132'        ,
    postState     :'nothing'    ,
    postTime      :''           ,
  },
  editor:{
    catelog       : []          ,
    firstPage     : 1           ,
    page          : 1           ,
    pageWidth     : 7           ,
    step          : 10          ,

    mode          : 'edit'      , // view or edit       
    aid           : ''          ,
    title         : ''          ,
    type          : ''          ,
    content       : ''          ,
  }
};

const win = window;
//win.Perf = Perf;

// thunk middleware for ajax
const middlewares = [thunkMiddleware];
const storeEnhancers = compose( 
  applyMiddleware(...middlewares), (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,);

const store = createStore(reducer,initialValue,storeEnhancers);
export default store;