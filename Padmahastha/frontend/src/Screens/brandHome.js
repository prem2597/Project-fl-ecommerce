import React from 'react';
// import { Link } from 'react-router-dom'
// import data from '../data';
import data from '../brands';
import { Route, Link } from 'react-router-dom'
import HomeScreen from './HomeScreen';

function brandHomeScreen(props) {

  // const learnmore = () => {
  //   document.getElementById(learnmore)
  // }
  return <ul className="products">
    {
      data.brands.map(product =>
        <li>
          <div className="product">
          
            <Link to={'/product/' + product._id}>
              <img className="product-image" src={product.image} alt="product" />

            </Link>
            {/* <button type="button"  className="button secondary" onClick={learnmore}>LearnMore</button> */}
            {/* <button type="button"  className="button secondary">Shop Now</button> */}
            <Link to={'/product/' + product._id}>Shop Now </Link>




            <div className="product-name">
              <Link to={'/product/' + product._id}>{product.name}</Link>
            </div>
           
            
          </div>
        </li>)
    }



  </ul>
}
export default brandHomeScreen;