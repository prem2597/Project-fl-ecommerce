import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/signinScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/registerScreen';
import ProductsScreen from './screens/productsScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/paymentScreen';
import PlaceOrderScreen from './screens/placeOrderScreen';
import OrderScreen from './screens/orderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/profileScreen';
import HomepageScreen from './screens/HomepageScreen';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/" >Padmahastha</Link>
            {/* <a href="index.html">Padmahastha</a> */}
          </div>
          <div className="header-links">
            {/* <a href="cart.html">Cart</a> */}
            <Link to="/cart/:id?">Cart</Link>
            <Link to="/homepage">ShopNow</Link>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link>:

                <Link to="/signin">Sign In</Link>

            }
            {userInfo && userInfo.isAdmin && (
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
            <li>
              <Link to="/category/menswear">Menswear</Link>
            </li>
            <li>
              <Link to="/category/womenswear">Womenswear</Link>
            </li>
            <li>
              <Link to="/category/jewellery">Jewellery</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/brand/:name" component={HomeScreen} />
            <Route path="/" exact={true} component={HomepageScreen} />
            <Route path="/homepage" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
