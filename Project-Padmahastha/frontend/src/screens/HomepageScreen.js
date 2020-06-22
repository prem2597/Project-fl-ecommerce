import React from 'react';
import data from '../brands';
import { Link } from 'react-router-dom'

function HomepageScreen(props) {
  return <ul className="products">
    {
      data.brands.map(brand =>
        <li>
            <div className="product">
                <Link to={'/brand/' + brand.name}>
                    <img className="product-image" src={brand.image} alt="product" />
                </Link>
                 <div className="product-name">
                    <Link to={'/brand/' + brand.name}>{brand.name}</Link>
                </div>
                <div className="learn">
                  <p> {brand.learnmore} </p>
                </div>
            </div>
        </li>)
    }
  </ul>
}

export default HomepageScreen;
