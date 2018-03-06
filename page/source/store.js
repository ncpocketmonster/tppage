import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//reducers
import {reducer as menuReducer} from './menu';
import {reducer as articleReducer} from './article';

const reducer = combineReducers({
  menu    : menuReducer,
  article : articleReducer, 
});

const initialValue = {
  menu:[1,2,3],
  article:{
    title:'waiting',
    content:'unknown',
  },
};

const win = window;
//win.Perf = Perf;

// thunk middleware for ajax
const middlewares = [thunkMiddleware];
const storeEnhancers = compose( 
  applyMiddleware(...middlewares), (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,);

const store = createStore(reducer,initialValue,storeEnhancers);
export default store;