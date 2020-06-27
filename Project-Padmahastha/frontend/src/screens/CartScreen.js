import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai'
/**
 * This cartScreen function will render the DOM with the cart details.
 * This function will take the props as a parameter from the product screen.
 * If the user clicks on the cart then it will get that productID.
 * @param {productId & quantity} props
 */
function CartScreen(props) {
    /**
     * The useSelector will get the cart state from the redux store.
     * The cart state will be used to indicate the number of items in the cart.
     */
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    /**
     * This remove from cart Handler will remove the item from the cart
     * when the user clicks on the product delete button.
     * @param {product unique id} productId 
     */
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    /**
     * This useEffect will store the state in the redux store.
     */
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    /**
     * This checkoutHandler will call the props.history function.
     * props.history will navigate to the other view of the application.
     */
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }
    /**
     * This return will change the view of the DOM.
     */
    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is Empty
                    </div>
                    :
                    cartItems.map(item =>
                        <li>
                            <div className="cart-image">
                                <img src={item.image} alt="product" />
                            </div>
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/" + item.product}>
                                        {item.name}
                                    </Link>
                                </div>
                                <div>
                                    Qty:
                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                    <button type="button" className="button" onClick={ () => removeFromCartHandler(item.product)}>
                                        <AiFillDelete />
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                ${item.price}
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( {cartItems.reduce((a,c) => a + c.qty * 1, 0)} items)
                :
                $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                Proceed to checkout
            </button>
        </div>
    </div>
}

export default CartScreen;
