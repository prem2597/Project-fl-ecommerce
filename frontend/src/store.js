import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer } from './reducers/productReducers';
import {cartReducer } from './reducers/cartReducers'
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo")||null;
const initialState ={cart :{ cartItems},userSignin:{userInfo}};
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userSignin : userSigninReducer,
    userRegister :userRegisterReducer,
    productSave:productSaveReducer

})

const composeEnhaner = window._REDUX_DEVTOOL_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer,initialState, compose(applyMiddleware(thunk)));
export default store;