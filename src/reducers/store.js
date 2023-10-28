import { combineReducers } from 'redux';
import { getAllProductosReducer, getProductoByIdReducer, getProductByTextReducer } from './productosReducer'
import { getcarritoReducer } from './carritoReducer'
import { loginReducer, registerNuevoUsuarioReducer } from './usuarioReducer'
import {createStore , applyMiddleware} from 'redux' 
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { placeOrderReducer } from './pasarelaReducer';

const rootReducer = combineReducers({
  getAllProductosReducer: getAllProductosReducer,
  getProductoByIdReducer : getProductoByIdReducer,
  getcarritoReducer : getcarritoReducer,
  registerNuevoUsuarioReducer : registerNuevoUsuarioReducer,
  loginReducer : loginReducer,
  placeOrderReducer : placeOrderReducer
  
});

const articles = JSON.parse(localStorage.getItem('articles')) || [];
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null


const initialState = {
  getcarritoReducer: { articles:articles },
  loginReducer : { currentUser : currentUser}
};


const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(rootReducer , initialState, composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
))


export default store; 