import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL } from '../constants/productConstants'
import axios from 'axios';
import Axios from 'axios';

/**
 * This action listProducts sends these params and 
 * make a dispatch request to backend server to list the products
 * according to the search keywords, sortOrder, category, brand
 * 
 * @param { brand } brand 
 * @param { category } category 
 * @param { searchKeyword } searchKeyword 
 * @param { sortOrder } sortOrder 
 */
const listProducts = (brand = '', category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products?category=" + category +
        "&searchKeyword=" + searchKeyword + "&sortOrder=" + sortOrder + "&brand=" + brand);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}
/**
 * This action brandProducts send the brand ad param and
 * make a dispatch request to backend server to list the products
 * according to the brand.
 * 
 * @param { brand } brand
 */

const brandProducts = (brand='') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products?brand=" + brand);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

/**
 * This action saveProduct make a dispatch request to the 
 * backend server for creating a new product by adding to the database.
 * 
 * @param { product } product 
 */
const saveProduct = (product) => async (dispatch, getState) =>{
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        const {userSignin:{userInfo}} = getState();
        if(!product._id) {
            const { data } = await Axios.post('/api/products', product, {
                headers:{
                    'Authorization' : 'Bearer ' + userInfo.token
                }
            });
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        } else {
            const { data } = await Axios.put('/api/products/' + product._id, product, {
                headers:{
                    'Authorization' : 'Bearer ' + userInfo.token
                }
            });
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        }
    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
}

/**
 * This action detailsProduct make a dispatch request to the 
 * backend server to get the details of the product as to the prouctId
 * 
 * @param { productId } productId 
 */
const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("/api/products/"+productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}

const updateProduct = (productId, qty) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_REQUEST});
        const {data} = await axios.post("/api/products/update?id="+productId+"&qty="+qty);
        dispatch({type: UPDATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: UPDATE_FAIL, payload: error.message});
    }
}

/**
 * This action deleteProduct make a dispatch request to the 
 * backend server to delete a product by the admin.
 * 
 * @param { productId } productId 
 */
const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const {data} = await axios.delete("/api/products/"+productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message});
    }
}

export { listProducts, detailsProduct, saveProduct, deleteProduct, brandProducts, updateProduct }

