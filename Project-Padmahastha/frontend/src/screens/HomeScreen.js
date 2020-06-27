import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, brandProducts } from '../actions/productActions';
import { BsSearch } from 'react-icons/bs';
import { FcFilledFilter } from 'react-icons/fc';

/**
 * This HomeScreen function used in the App
 * This function consists search bar and filter option to filter the products.
 */
function HomeScreen(props) {
  
  /**
   * This useSelector function will extract the data from redux store state.
   * The useSelector will take the current state as the argument and returns
   * the required state.
   * Redux generally used to maintian the states of the entire application.
   */
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const category = props.match.params.id ? props.match.params.id : '';
  const brand = props.match.params.name ? props.match.params.name : '';

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  /**
  * This useEffect will store the state in the redux store.
  */
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
    // eslint-disable-next-line
  }, [category]);
  
  /**
   * This will search the keyword that enter by the user
   * in the products database and return the results.
   */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(brand,category, searchKeyword, sortOrder))
  }

  /**
   * This will sort the products that set by the user
   * in the products database and return the results.
   */
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(brand,category, searchKeyword, sortOrder))
  }

  /**
   * This will return the data about how the DOM should look like.
   */
  return <>
    {
      category && <h2>{category}</h2>
    }
    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type="submit"><BsSearch /></button>
        </form>
      </li>
      <li>
        <FcFilledFilter /> {' '}
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
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

