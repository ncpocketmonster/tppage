import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//reducers
import {reducer as menuReducer   } from './menu';
import {reducer as articleReducer} from './article';
import {reducer as writeReducer  } from './write';

const reducer = combineReducers({
  menu    : menuReducer    ,
  article : articleReducer , 
  write   : writeReducer   , 
});

const initialValue = {
  menu:{
    articles:[],
    page:0,
    step:12,
    firstPage:0,
  },
  article:{
    title:'nothing',
    content:'nothing',
  },
  write:{
    content:'321',
    keywords:['321'],
    title:'123',
    password:'132',
    postState:'nothing',
    postTime:'',
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