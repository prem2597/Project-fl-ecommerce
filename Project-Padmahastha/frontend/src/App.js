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
import HomeScreen1 from './screens/HomeScreen1';
/**
 * This  App function will be rendered into the html page in the root id.
 * This function consists of header and the footer.
 * The navigation bar is also included in the header.
 * Here a hamburger menu is also included where the categories are displayed.
 * The BrowserRoutes are used to navigate from one page to another.
 */
function App() {
  /**
   * This useSelector function will extract the data from redux store state.
   * The useSelector will take the current state as the argument and returns
   * the required state.
   * Redux generally used to maintian the states of the entire application.
   */
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  /**
   * The openMenu and close menu functions are used for hamburger menu.
   */
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  /**
   * This will return the data about how the DOM should look like.
   */
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/" >Padmahastha</Link>
          </div>
          <div className="header-links">
            <Link to="/allproducts">Shop</Link>
            {
              cartItems.length === 0 ?
              <div></div>
              :
              <div className="badge">{cartItems.length}</div>
            }
            <Link to="/cart"><strong>Cart</strong></Link>
            {
              userInfo ? <Link to="/profile"><strong>{userInfo.name}</strong></Link>:
                <Link to="/signin"><strong>Sign In</strong></Link>
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#"><strong>Admin</strong></Link>
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
            <Route path="/" exact={true} component={HomeScreen1} />
            <Route path="/allproducts" exact={true} component={HomeScreen} />
            <Route path="/brands/:name" exact={true} component={HomeScreen} />
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
