import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton'
  
/**
* This function OrderScreen shows the order details and 
* payment options that user can pay through. After successful 
* payment, the user redirects to his/her profile page and
*/
function OrderScreen(props) {
    
    /**
    * This useSelector function will extract the data from redux store state.
    * The useSelector will take the current state as the argument and returns
    * the required state.
    * Redux generally used to maintian the states of the entire application.
    */
    const orderPay = useSelector(state => state.orderPay);
    // eslint-disable-next-line
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
    
    const dispatch = useDispatch();
    
    /**
     * This useEffect will store the state in the redux store.
     */
    useEffect(() => {
        if (successPay) {
            props.history.push("/profile");
        } else {
            dispatch(detailsOrder(props.match.params.id));
        }
        return () => {
        };
        // eslint-disable-next-line
    }, [dispatch, props.match.params.id, successPay]);

    /**
     * This function is called to make payment for the order
     * the user wants to purchase by redirecting to payment gateway.
     */
    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;
    
    /**
    * This will return the data about how the DOM should look like.
    */
    return loading ? <div>Loading ...</div> : error ? <div>{error}</div> : <div>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Shipping</h3>
                    <div>
                        {order.shipping.address}, {order.shipping.city},
                        {order.shipping.postalCode}, {order.shipping.country},
                    </div>
                    <div>
                        {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {order.payment.paymentMethod}
                    </div>
                    <div>
                        {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <div>Price</div>
                        </li>
                        {
                            order.orderItems.length === 0 ?
                            <div>Cart is empty</div>
                            :
                            order.orderItems.map(item =>
                                <li>
                                    <div className="cart-image">
                                        <img src={item.image} alt="product" />
                                    </div>
                                    <div className="cart-name">
                                        <div>
                                            <Link to={"/product/" + item.product}>{item.name}</Link>
                                        </div>
                                        <div>
                                            Qty: {item.qty}
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        ${item.price}
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="placeorder-action">
                <ul>
                    <li className="placeorder-actions-payment">
                        { !order.isPaid && <PaypalButton amount={order.totalPrice} onSuccess={handleSuccessPayment} /> }                        
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${order.itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${order.shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${order.taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${order.totalPrice}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default OrderScreen;

