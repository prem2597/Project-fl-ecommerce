import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
// import data from  './data';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {

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
            <a href="cart.html">Cart</a>
            <a href="signin.html">Signin</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="index.html">Menswear</a>
            </li>
            <li>
              <a href="index.html">Womenswear</a>
            </li>
            <li>
              <a href="index.html">Jewellery</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
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
