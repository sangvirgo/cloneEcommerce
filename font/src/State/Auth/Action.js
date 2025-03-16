import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { API_BASE_URL } from "../../config/ApiConfig";

const token= localStorage.getItem("jwt")
const registerRequest= () => ({type:REGISTER_REQUEST});
const registerSuccess= (user) => ({type:REGISTER_SUCCESS, payload:user});
const registerFailure= (error) => ({type:REGISTER_FAILURE, payload:error});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        const user=response.data;
        if(user.jwt) {
            localStorage.setItem('jwt', user.jwt);
        }
        dispatch(registerSuccess(user.jwt));
    } catch(error) {
        dispatch(registerFailure(error.message));
    }
}


const loginRequest= () => ({type:LOGIN_REQUEST});
const loginSuccess= (user) => ({type:LOGIN_SUCCESS, payload:user});
const loginFailure= (error) => ({type:LOGIN_FAILURE, payload:error});

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user=response.data;
        if(user.jwt) {
            localStorage.setItem('jwt', user.jwt);
        }
        dispatch(loginSuccess(user.jwt));
    } catch(error) {
        dispatch(loginFailure(error.message));
    }
}




const getUserRequest= () => ({type:GET_USER_REQUEST});
const getUserSuccess= (user) => ({type:GET_USER_SUCCESS, payload:user});
const getUserFailure= (error) => ({type:GET_USER_FAILURE, payload:error});

export const getUser = () => async (dispatch) => {
    dispatch(getUserRequest());

    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const user=response.data;

        dispatch(getUserSuccess(user));
    } catch(error) {
        dispatch(getUserFailure(error.message));
    }
}




const LOGOUT= () => ({type:LOGOUT});

export const log = () => async (dispatch) => {
    dispatch({type:LOGOUT, payload: null});
}