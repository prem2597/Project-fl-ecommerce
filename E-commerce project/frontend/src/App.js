import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrdersScreen from './Screens/OrdersScreen';

function App() {

	const userSignin = useSelector(state => state.userSignin);
  	const { userInfo } = userSignin;

  	const openMenu = () => {
    	document.querySelector(".sidebar").classList.add("open");
  	}
  	const closeMenu = () => {
    	document.querySelector(".sidebar").classList.remove("open")
  	}
	return (
    	<BrowserRouter>
      		<div className="grid-container">
        		<header className="header">
          			<div className="brand">
            			<button onClick={openMenu}>
              				&#9776;
        				</button>
            			<Link to="/" >amazona</Link>
          			</div>
          			<div className="header-links">
            			<a href="cart.html">Cart</a>
						{
							userInfo ? <Link to="/profile">{userInfo.name}</Link>:
							<Link to="/signin">Sign in</Link>
						}
						{
							userInfo && userInfo.isAdmin && (
							<div className="dropdown">
								<a href="#">Admin</a>
	                			<ul className="dropdown-content">
                  					<li>
                    					<Link to="/orders">Orders</Link>
                    					<Link to="/products">Products</Link>
                  					</li>
                				</ul>
							</div>
						)}
          			</div>
        		</header>
        		<aside className="sidebar">
          			<h3>Shopping Categories</h3>
          			<button className="sidebar-close-button" onClick={closeMenu}>x</button>
          			<ul className="categories">
            			<li><Link to="/category/Pants">Pants</Link></li>
            			<li><Link to="/category/Shirts">Shirts</Link></li>
          			</ul>
        		</aside>
        		<main className="main">
          			<div className="content">
						<Route path="/orders" component={OrdersScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/order/:id" component={OrderScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/products" component={ProductsScreen} />
					  	<Route path="/signin" component={SigninScreen} />
            			<Route path="/register" component={RegisterScreen} />
            			<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/category/:id" component={HomeScreen} />
            			<Route path="/" exact={true} component={HomeScreen} />
          			</div>
        		</main>
        		<footer className="footer">
          			All right reserved.
    			</footer>
      		</div>
    	</BrowserRouter>
  	);
}

export default App;