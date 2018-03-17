import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//reducers
import {reducer as menuReducer   } from './menu';
import {reducer as articleReducer} from './article';
import {reducer as editorReducer } from './editor';

const reducer = combineReducers({
  menu    : menuReducer    ,
  article : articleReducer , 
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
  editor:{
    catelog       : []          ,
    firstPage     : 1           ,
    page          : 1           ,
    pageWidth     : 5           ,
    step          : 10          ,

    mode          : 'edit'      , // view or edit       
    aid           : ''          ,
    title         : ''          ,
    type          : ''          ,
    content       : ''          ,

    reverseItem   : false       ,
    lockScroll    : false       ,
    scrollTop     : 0           ,
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