import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { API_BASE_URL } from "../../config/ApiConfig";

const registerRequest = () => ({type:REGISTER_REQUEST});
const registerSuccess = (user) => ({type:REGISTER_SUCCESS, payload:user});
const registerFailure = (error) => ({type:REGISTER_FAILURE, payload:error});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        const user = response.data;
        if(user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            dispatch(registerSuccess(user.jwt));
            dispatch(getUser(user.jwt));
            console.log("User register successfully:", user);
        }
    } catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(registerFailure(errorMessage));
    }
}

const loginRequest = () => ({type:LOGIN_REQUEST});
const loginSuccess = (user) => ({type:LOGIN_SUCCESS, payload:user});
const loginFailure = (error) => ({type:LOGIN_FAILURE, payload:error});

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user = response.data;
        if(user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            dispatch(loginSuccess(user.jwt));
            dispatch(getUser(user.jwt));
            console.log("User logged in successfully:", user);
        }
    } catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(loginFailure(errorMessage));
    }
}

const getUserRequest = () => ({type:GET_USER_REQUEST});
const getUserSuccess = (user) => ({type:GET_USER_SUCCESS, payload:user});
const getUserFailure = (error) => ({type:GET_USER_FAILURE, payload:error});

export const getUser = (jwt) => async (dispatch) => {
    if (!jwt) {
        console.warn("No JWT provided to getUser");
        return;
    }
    
    dispatch(getUserRequest());
    console.log("Fetching user with JWT:", jwt);
    
    try {
        // Kiểm tra xem JWT có bắt đầu bằng "Bearer " không
        // Nếu không, thêm tiền tố "Bearer " vào
        const authToken = jwt.startsWith("Bearer ") ? jwt : `Bearer ${jwt}`;
        console.log("Using auth token:", authToken);
        
        console.log("Making request to:", `${API_BASE_URL}/api/user/profile`);
        console.log("Headers:", {
            "Authorization": authToken
        });
        
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            headers: {
                "Authorization": authToken
            }
        });
        
        console.log("Response received:", response);
        
        if (response.status === 200) {
            const user = response.data;
            console.log("User data fetched successfully:", user);
            dispatch(getUserSuccess(user));
        } else {
            console.error("Unexpected response status:", response.status);
            dispatch(getUserFailure("Unexpected response from server"));
        }
    } catch(error) {
        console.error("Error object:", error);
        
        let errorMessage = "Unknown error";
        if (error.response) {
            console.error("Error response:", error.response);
            errorMessage = error.response.data?.message || error.response.data?.error || `Error ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
            console.error("Error request (no response received):", error.request);
            errorMessage = "Network error - no response received from server";
        } else {
            console.error("Error setting up request:", error.message);
            errorMessage = error.message;
        }
        
        console.error("Error fetching user:", errorMessage);
        
        // Nếu lỗi là do token không hợp lệ hoặc hết hạn, xóa token khỏi localStorage
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Authentication error, clearing JWT token");
            localStorage.removeItem('jwt');
            errorMessage = "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
        }
        
        dispatch(getUserFailure(errorMessage));
    }
}

const LOGOUT_REQUEST = () => ({type: 'LOGOUT_REQUEST'});
const LOGOUT_SUCCESS = () => ({type: 'LOGOUT'});

export const logout = () => async (dispatch) => {
    try {
        dispatch(LOGOUT_REQUEST());
        localStorage.removeItem('jwt');
        dispatch(LOGOUT_SUCCESS());
        window.location.href = '/';
    } catch (error) {
        console.error("Logout error:", error);
    }
}