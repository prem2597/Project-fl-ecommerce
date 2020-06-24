import Axios from "axios";
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, 
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL 
} from "../constants/userConstants";

/**
 * This signin action sends the data with dispatch
 * and making a request to backend server for sign-in (log-in to existing account)
 * And then, the userInfo is saved to cookies.
 * 
 * @param { email } email 
 * @param { password } password 
 */
const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
    }
}

/**
 * This register action sends the data with dispatch
 * and making a request to backend server for register (creating a new account)
 * And then, the userInfo is saved to cookies.
 * 
 * @param { name } name 
 * @param { email } email 
 * @param { password } password 
 */
const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}});
    try {
        const {data} = await Axios.post("/api/users/register", {name, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.message});
    }
}

/**
 * This update action sends the data with dispatch
 * and making a request to backkend server for updating the user details
 * And then, the userInfo is saved to cookies.
 * 
 * @param { userId } userId
 * @param { name } name
 * @param { email } email
 * @param { password } password 
 */
const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
    try {
      const { data } = await Axios.put("/api/users/" + userId,
        { name, email, password }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}

/**
 * This logout action clears the session of the current logged in user
 * by removing userInfo from cookies.
 */
const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
}

export { signin, register, logout, update };
