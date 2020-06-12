import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen (props) {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();
    
  
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address, city, postalCode, country}));
        props.history.push('payment')
    }

  
    
    return <div> 
        <CheckoutSteps step1 step2 > </CheckoutSteps>
        <div className="form">
        <form onSubmit = {submitHandler}>
           <ul className = "form-container">
               <li>
                 <h2> Shipping </h2>

               </li>
              

               <li>
                   <label htmlFor="address">
                       Address
                   </label>
                   <input type="address" name="address " onChange={(e)=> setAddress(e.target.value)}>
                   </input>

               </li>

               <li>
                   <label htmlFor="city">
                       City
                   </label>
                   <input type="city" name="city " onChange={(e)=> setCity(e.target.value)}>
                   </input>

               </li>

               <li>
                   <label htmlFor="postalCode">
                       Postal Code
                   </label>
                   <input type="postalCode" name="postalCode" onChange={(e)=> setPostalCode(e.target.value)}>
                   </input>

               </li>

               <li>
                   <label htmlFor="country">
                       Country
                   </label>
                   <input type="country" name="country" onChange={(e)=> setCountry(e.target.value)}>
                   </input>

               </li>

               
               <li>
                   <button type="submit" className="button primary"> Continue </button>
               </li>
            
           </ul>

        </form>
    </div>
    </div>
    
    
}
export default ShippingScreen;