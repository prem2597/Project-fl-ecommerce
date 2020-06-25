import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import axios from 'axios';

/**
 * This ProductScreen contains the details of the product 
 * and also other options such as -
 * setting the quantity of the products i.e., no. of items,
 * and add to cart option for that product.
 */
function ProductScreen(props) {
    /**
    * This useSelector function will extract the data from redux store state.
    * The useSelector will take the current state as the argument and returns
    * the required state.
    * Redux generally used to maintian the states of the entire application.
    */
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    const updateCall = async (id) => {
        const details = await axios.get("/api/products/"+id);
        document.getElementById('dataupdate').innerHTML = details.data.countInStock;
        product.countInStock = details.data.countInStock;
    }

    /**
    * This useEffect will store the state in the redux store.
    */
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        const interval = setInterval(() => {
            updateCall(props.match.params.id);
            console.log("THis component is fetching the data after 10 secs.")
        }, 10000)
        return () => clearInterval(interval); {
          
        };
    }, [dispatch,props.match.params.id]);

    /**
     * This const handleAddToCart adds the product
     * to the cart.
     */
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty )
    }

    /**
    * This will return the data about how the DOM should look like.
    */
    return <div>
        <div className="back-to-result">
            <Link to = "/allproducts">Back to shop</Link>
        </div>
        { loading? <div>Loading...</div>:
            error? <div>{error}</div>:
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product" ></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} Stars ({product.numReviews} Reviews)
                                </li>
                                <li>
                                    Price: <b>${product.price}</b>
                                </li>
                                <li>
                                    Description:
                                    <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Price: {product.price}
                                </li>
                                <li>
                                    Status: {product.countInStock > 0 ? "In Stock": "Unavailable"}. Count is mentioned below.
                                </li>
                                <li id="dataupdate">
                                    {product.countInStock}
                                </li>
                                <li>
                                    Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                        {[...Array(product.countInStock).keys()].map(x=>
                                            <option key={x+1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </li>
                                <li>
                                    {
                                        product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                )
        }   
    </div>
}

export default ProductScreen;