import { combineReducers } from 'redux';
import { getAllProductosReducer } from './productosReducer'
import {createStore , applyMiddleware} from 'redux' 
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  getAllProductosReducer: getAllProductosReducer,
});

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(rootReducer , {}, composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
))


export default store; 