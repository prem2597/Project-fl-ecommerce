import Axios from "axios"
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

/**
 * This action addToCart make a dispatch to the backend server
 * to get the product details and add the product to cart.
 * And then, save to the cookies 'cartItems'
 * 
 * @param { productId } productId 
 * @param { qty } qty 
 */
const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get("/api/products/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });
    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        
    }
}

/**
 * This action removeFromCart make a dispatch 
 * remove an productId from cart which saved in cookies.
 * 
 * @param { productId } productId 
 */
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId });
    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

/**
 * This action saveShipping make a dispatch to save 
 * the shipping details in cookies.
 * 
 * @param { data } data 
 */
const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}

/**
 * This action savePayment make a dispatch to save 
 * the payment info in cookies.
 * 
 * @param { data } data 
 */
const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

export { addToCart, removeFromCart, saveShipping, savePayment }
