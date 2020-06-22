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
                {/* <div className="shop"> 
                <Link to={'/brands/' + brand.name}>Shop Now </Link>
                </div> */}

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

// function HomeScreen1(props) {

 
//   return <ul className="brands">
//     {
//       data.brands.map(brand =>
//         <li>
//             <div className="brand">
            
//                 <Link to={'/brands/' + brand.name}>
//                     <img className="brand-image" src={brand.image} alt="product" />
//                 </Link>
//                 <Link to={'/brands/' + brand.name}>Shop Now </Link>

//                  <div className="brand-name">
//                     <Link to={'/brands/' + brand.name}>{brand.name}</Link>
//                 </div>
           
            
//             </div>
//         </li>)
//     }



//   </ul>
// }
export default HomeScreen1;