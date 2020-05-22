import React,{useState,useEffect} from 'react';
// import React,{useEffect} from 'react';
// import render from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
// import data from '../data';
import axios from 'axios';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {
    // console.log("printed homescreen");

    // render()
    // const [products,setProduct] = useState([]);
    const productList = useSelector(state => state.productList);
    const { products,loading,error} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listProducts());
      return () => {

      };
    },[])


    
  return loading ? <div>loading...</div> :
    error ? <div>{error}</div> :
  <ul className = "products">
    {
      products.map(product =>
        <li key={product._id}>
          <div className = "product">
          <Link to={"/products/" + product._id}><img className = "product-image" src={product.image} alt ="product"/></Link>
              
              <div className = "product-name">
              {/* <a href="product.html">{product.name}</a> */}
              <Link to={"/products/" + product._id}>{product.name}</Link>
              </div>
              <div className = "product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">{product.rating} Stars {product.numReviews}</div>
              </div>
      </li> )
    }
      
   </ul>
};

    
export default HomeScreen;