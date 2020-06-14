import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

/**
 * The actions for adding items to the cart
 * @param {the product id which is generated while adding products } productId 
 * @param {*Number of items added} qty 
 */
const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch (error) {
        
    }
}

/**
 * This is reagrding how to remove a product from the cart
 * @param {The product id which is to be deleted} productId 
 */
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}
/**
 * 
 * @param {*} data 
 */
const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}

const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

export { addToCart, removeFromCart, saveShipping, savePayment }