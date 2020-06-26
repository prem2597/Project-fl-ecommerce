import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders, deleteOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

/**
 * This ProfileScreen function displays the user details and 
 * the orders he/she placed. Also, The user is allowed to edit
 * the details like email, username, password 
 * and logout from the session.
*/
function ProfileScreen(props) {

    /**
     * This useSelector function will extract the data from redux store state.
     * The useSelector will take the current state as the argument and returns
     * the required state.
     * Redux generally used to maintian the states of the entire application.
    */
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    /**
     * This handleLogout clears the the userInfo
     * from the session and Signin screen displayed
     */
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    }

    /**
     * This submitHandler saves the users updated details
     * to the database which requires when sign-in.
     */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({ userId: userInfo._id, email, name, password }))
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

    const orderDelete = useSelector(state => state.orderDelete);
    // eslint-disable-next-line
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order));
    }
    
    /**
     * This useEffect will store the state in the redux store.
    */
    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        dispatch(listMyOrders());
        return () => {
            //
        };
        // eslint-disable-next-line
    }, [userInfo, successDelete])

    /**
     * This will return the data about how the DOM should look like.
    */
    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Profile Saved Successfully.</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Update</button>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid}</td>
                                    <td>
                                        <Link to={"/order/" + order._id}>DETAILS</Link>
                                        {'  '}
                                        <button className="button" onClick={() => deleteHandler(order._id)}>Delete</button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
            }
        </div>
    </div>
}

export default ProfileScreen;

