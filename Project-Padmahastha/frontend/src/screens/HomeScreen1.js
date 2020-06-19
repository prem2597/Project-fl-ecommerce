import React from 'react';
import data from '../brands';
import { Route, Link } from 'react-router-dom'
import HomeScreen from './HomeScreen';

function HomeScreen1(props) {

 
  return <ul className="products">
    {
      data.brands.map(brand =>
        <li>
            <div className="product">
            
                <Link to={'/brands/' + brand.name}>
                    <img className="product-image" src={brand.image} alt="product" />
                </Link>
                <Link to={'/brands/' + brand.name}>Shop Now </Link>

                 <div className="product-name">
                    <Link to={'/brands/' + brand.name}>{brand.name}</Link>
                </div>
           
            
            </div>
        </li>)
    }



  </ul>
}
export default HomeScreen1;