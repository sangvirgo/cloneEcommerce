import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "./ActionType";
import {api} from '../../config/ApiConfig'

export const createOrder= (reqData) => async (dispatch) => {
    console.log("Requesting to create order", reqData);
    dispatch({ type: CREATE_ORDER_REQUEST });

    try {
        const data = await api.post("/api/orders/", reqData.address);
        if (data.id) {
            reqData.navigate({search: `step=3&order_id=${data.id}`});
        }

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ 
            type: CREATE_ORDER_FAILURE, 
            payload: error.message,
        });
    }
}


export const getOrderById= (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    try {
        const data = await api.get(`/api/orders/${orderId}`);

        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ 
            type: GET_ORDER_BY_ID_FAILURE, 
            payload: error.message,
        });
    }
}

export const getAddress = () => async (dispatch) => {
    dispatch({ type: GET_ADDRESS_REQUEST });

    try {
        const data = await api.get("/api/user/address");
        dispatch({ type: GET_ADDRESS_SUCCESS, payload: data });
        console.log("Address data", data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Không thể lấy địa chỉ";
        dispatch({ 
            type: GET_ADDRESS_FAILURE, 
            payload: errorMessage,
        });
    }
}

export const addAddress = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ADDRESS_REQUEST});

    try {
        const addressData = {
            firstName: reqData.firstName,
            lastName: reqData.lastName,
            streetAddress: reqData.streetAddress,
            city: reqData.city,
            state: reqData.state,
            zipCode: reqData.zipCode,
            mobile: reqData.mobile,
        };

        const data = await api.post("/api/user/addresses", addressData);
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Không thể thêm địa chỉ";
        dispatch({ 
            type: ADD_ADDRESS_FAILURE, 
            payload: errorMessage,
        });
    }   
}