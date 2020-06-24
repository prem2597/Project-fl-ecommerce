import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

/**
 * This RegisterScreen function contains a form which allows
 * create a new account for the user.
 */
function SigninScreen(props) {

    /**
     * This useSelector function will extract the data from redux store state.
     * The useSelector will take the current state as the argument and returns
     * the required state.
     * Redux generally used to maintian the states of the entire application.
    */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    
    /**
     * This useEffect will store the state in the redux store.
    */
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
        };
    }, [userInfo, props.history, redirect]);

    /**
     * This submitHandler sign-in for the user
     * creates a session and 
     * allows him to buy the products 
    */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    /**
     * This will return the data about how the DOM should look like.
    */
    return <div className="form">
        <form onSubmit = {submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    New to Padmahastha?
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center">Create your padmahastha account</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default SigninScreen;
