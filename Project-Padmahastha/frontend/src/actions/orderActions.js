import Axios from 'axios';
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, 
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, 
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, 
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, 
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL 
} from '../constants/orderConstants';

/**
 * This action createOrder make a dispatch request to the 
 * backend server for creating the order by the signed-in user.
 * 
 * @param { order } order 
 */
const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST, payload: order});
        const { userSignin: { userInfo } } = getState();
        const { data: { data: newOrder } } = await Axios.post("/api/orders", order, {
            headers: {
                Authorization: ' Bearer ' + userInfo.token
            }
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
}

/**
 * This action detailsOrder make a dispatch request to the
 * backend server to see the details of the order.
 * Authentication and admin are required
 * to perfrom this action.
 * 
 * @param { orderId } orderId 
 */
const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders/" + orderId, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
    }
}

/**
 * This action payOrder make a dispatch to the 
 * backend server to place the order and make payment 
 * for the order.
 * Authentication is required to perform this action.
 * 
 * @param { order } order 
 * @param { paymentResult } paymentResult 
 */
const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
            headers:
            { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
    }
}

/**
 * This action listOrders make a dispatch request to the 
 * backend server to see the list of orders that are made by the users.
 * This action performed by admin.
 */
const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get("/api/orders", {
            headers:
            { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    }
}

/**
 * This action deleteOrder make a dispatch request to the backend server
 * for deleting the order
 * This action is made only by the admin.
 * 
 * @param { orderId } orderId 
 */
const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.delete("/api/orders/" + orderId, {
            headers:
            { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
    }
}

/**
 * This action listMyOrders make a dispatch request to the 
 * backend server to list the user's orders in the profile screen
 * Authentication is required to this action.
 */
const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_ORDER_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders/mine", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
    }
}

export { createOrder, detailsOrder, payOrder, listOrders, deleteOrder, listMyOrders };

