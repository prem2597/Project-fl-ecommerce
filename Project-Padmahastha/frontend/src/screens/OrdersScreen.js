import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

/**
 * This OrdersScreen function is like Managing orders.
 * Only admin has access to this screen where he/she can
 * delete the order or go through the order details placed
 * by the user.
 */
function OrdersScreen(props) {
    /**
    * This useSelector function will extract the data from redux store state.
    * The useSelector will take the current state as the argument and returns
    * the required state.
    * Redux generally used to maintian the states of the entire application.
    */
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    const dispatch = useDispatch();

    /**
     * This useEffect will store the state in the redux store.
     */
    useEffect(() => {
        dispatch(listOrders());
        return () => {
            //
        };
    }, [successDelete]);

    /**
    * This will delete the order with respect to the order id.
    */
    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id));
    }
    
    /**
    * This will return the data about how the DOM should look like.
    */
    return loading ? <div>Loading...</div> :
    <div className="content content-margined">
        <div className="order-header">
            <h3>Orders</h3>
        </div>
        <div className="order-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>USER</th>
                        <th>PAID</th>
                        <th>PAID AT</th>
                        <th>DELIVERED</th>
                        <th>DELIVERED AT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (<tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.user.name}</td>
                        <td>{order.isPaid.toString()}</td>
                        <td>{order.paidAt}</td>
                        <td>{order.isDelivered.toString()}</td>
                        <td>{order.deliveredAt}</td>
                        <td>
                            <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                            {' '}
                            <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </div>
}

export default OrdersScreen;

