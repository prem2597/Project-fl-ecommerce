import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, brandProducts } from '../actions/productActions';

function HomeScreen(props) {

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const category = props.match.params.id ? props.match.params.id : '';
  
  const brand = props.match.params.name ? props.match.params.name : '';

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    if(brand) {
      dispatch(brandProducts(brand))
    }
    else{
      dispatch(listProducts(brand,category));
    }
   
    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(brand,category, searchKeyword, sortOrder))
  }

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(brand,category, searchKeyword, sortOrder))
  }

  return <>
    {
      category && <h2 style={{textAlign:"center"}}>{category}</h2>
    }
    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </li>
      <li>
        Sort By {' '}
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
          {/* <option value="brand">Brands</option> */}
        </select>
      </li>
    </ul>
    {
      loading ? <div>Loading...</div> :
        error ? <div>{ error }</div> :
          <ul className="products">
            {
              products.map(product =>
                <li key={product._id}>
                  <div className="product">
                    <Link to={'/product/' + product._id}>
                        <img className="product-image" src={product.image} alt="product"></img>
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                  </div>
                </li>
              )
            }
          </ul>
    }
  </>
}

export default HomeScreen;

