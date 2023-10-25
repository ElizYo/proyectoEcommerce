import { combineReducers } from 'redux';
import { getAllProductosReducer } from './productosReducer'
import { getProductoByIdReducer } from './productosReducer'
import { getcarritoReducer } from './carritoReducer'
import { registerNuevoUsuarioReducer } from './usuarioReducer'

import {createStore , applyMiddleware} from 'redux' 
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  getAllProductosReducer: getAllProductosReducer,
  getProductoByIdReducer : getProductoByIdReducer,
  getcarritoReducer : getcarritoReducer,
  registerNuevoUsuarioReducer : registerNuevoUsuarioReducer,
  
});

const articles = JSON.parse(localStorage.getItem('articles')) || [];

const initialState = {
  getcarritoReducer: { articles:articles } 
};


const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(rootReducer , initialState, composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
))


export default store; 