import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

/**
 * This RegisterScreen function contains a form which allows
 * create a new account for the user.
 */
function RegisterScreen(props) {

    /**
     * This useSelector function will extract the data from redux store state.
     * The useSelector will take the current state as the argument and returns
     * the required state.
     * Redux generally used to maintian the states of the entire application.
    */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
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
     * This submitHandler creates an account for the user
     * and allows him to buy the products 
     */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }

    /**
     * This will return the data about how the DOM should look like.
    */
    return <div className="form">
        <form onSubmit = {submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Sign-Up</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
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
                    <label htmlFor="rePassword">Re-Enter Password</label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have an account? 
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >SignIn to your padmahastha account</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;
