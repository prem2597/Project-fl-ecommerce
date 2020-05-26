import React from 'react';
import { Link } from 'react-router-dom';
import {useEffect,useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { signin } from '../actions/userActions';



function SigninScreen(props) {
 
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const userSignin = useSelector(state=>state.userSignin);  
    const {loading,userInfo,error} = userSignin;
    const dispatch = useDispatch();

    useEffect(() => {
        if(userInfo) {
            props.history.push("/");
        }
        
        return () => {
        // effect
      };
    }, [userInfo,props.history]);

 const submitHandler = (e) => {
     e.preventDefault();
     dispatch(signin(email,password));
 }

    return  <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>

                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmFor="email">
                        Email
                    </label>
                    <input type = "email" name= "email" id="email" onChange={(e) => setEmail(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>

                    </input>
                </li>
                <li>
                   <button  type="submit"  className="button primary">Signin</button>
                </li>
                <li>
                    New to Padmahastha?
                </li>
                <li>
                    <Link to="/register" className="button  secondary text-center">Create your Padmahastha account</Link>
                </li>
            


            </ul>
        </form>
    </div>

}

export default SigninScreen;