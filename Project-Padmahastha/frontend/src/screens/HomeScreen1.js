import React from 'react';
import data from '../brands';
import { Link } from 'react-router-dom'

/**
 * This HomeScreen1 function used in the App displays the brands 
 * which are available in the website.
 * This is similar to products display in the HomeScreen.
 */
function HomeScreen1(props) {
  /**
   * This will return the data about how the DOM should look like.
   */
  return <ul className="products">
    {
      data.brands.map(brand => <li>
        <div className="product">
          <Link to={'/brands/' + brand.name}>
        	<img className="product-image" src={brand.image} alt="product" />
          </Link>
          <div className="shop">
            <Link to={'/brands/' + brand.name}>{brand.name}</Link>
          </div>
          <div className="learn">
            <p> {brand.learnmore} </p>
          </div>
        </div>
      </li>)
    }
  </ul>
}

export default HomeScreen1;