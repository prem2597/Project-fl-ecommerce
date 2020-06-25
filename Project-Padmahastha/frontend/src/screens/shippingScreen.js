import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/checkoutSteps';

/**
 * This ShippingScreen function contains a form
 * where the user needs to enter the shipping address
 * for delivering of the product.
 * This is the 2nd step of the checkout steps
 * The shipping details are saved and redirects to the payment screen.
 */
function ShippingScreen(props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    /**
     * This submitHandler saves the shipping details and redirects to
     * payment screen which is 3rd step of checkout steps
     */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country} ));
        props.history.push('payment');
    }

    /**
     * This will return the data about how the DOM should look like.
    */
    return <div>
        <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className="form">
            <form onSubmit = {submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Address
                        </label>
                        <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="postalCode">
                            Postal Code
                        </label>
                        <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="country">
                            Country
                        </label>
                        <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
}

export default ShippingScreen;
