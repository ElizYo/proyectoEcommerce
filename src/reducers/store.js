import { combineReducers } from 'redux';
import { getAllProductosReducer, getProductoByIdReducer, addProductReducer, deleteProductReducer, updateProductReducer, addProductoReviewReducer } from './productosReducer'
import { getcarritoReducer } from './carritoReducer'
import { loginReducer, registerNuevoUsuarioReducer, updateUsuarioReducer, getAllUsersReducer, deleteUsuarioReducer } from './usuarioReducer'
import {createStore , applyMiddleware} from 'redux' 
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { placeOrderReducer, getOrdersByUserIdReducer } from './pasarelaReducer';

const rootReducer = combineReducers({
  getAllProductosReducer: getAllProductosReducer,
  getProductoByIdReducer : getProductoByIdReducer,
  addProductReducer : addProductReducer,
  deleteProductReducer : deleteProductReducer,
  updateProductReducer : updateProductReducer,
  addProductoReviewReducer:addProductoReviewReducer,
  getcarritoReducer : getcarritoReducer,
  registerNuevoUsuarioReducer : registerNuevoUsuarioReducer,
  updateUsuarioReducer: updateUsuarioReducer,
  loginReducer : loginReducer,
  getAllUsersReducer:getAllUsersReducer,
  deleteUsuarioReducer:deleteUsuarioReducer,
  placeOrderReducer : placeOrderReducer,
  getOrdersByUserIdReducer : getOrdersByUserIdReducer,
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