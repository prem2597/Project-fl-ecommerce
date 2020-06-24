import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/checkoutSteps';

/**
 * This PaymentScreen shows the different payment methods
 * in a check box. The user can select one of the method.
 * This screen is 3rd step of the Checkout steps.
 */
function PaymentScreen(props) {
    /**
    * This useSelector function will extract the data from redux store state.
    * The useSelector will take the current state as the argument and returns
    * the required state.
    * Redux generally used to maintian the states of the entire application.
    */
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const dispatch = useDispatch();

    /**
     * This submit button redirect to the next checkout step
     * by saving the payment method selected by the user.
     */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push('placeorder');
    }
    /**
    * This will return the data about how the DOM should look like.
    */
    return <div>
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Payment</h2>
                    </li>
                    <li>
                        <div>
                            <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)}></input>
                            <label htmlFor="paymentMethod">Paypal</label>
                        </div>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
}

export default PaymentScreen;

