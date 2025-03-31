import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "./ActionType";
import { api } from '../../config/ApiConfig'

export const createOrder = (addressId) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    try {
        
        // Kiểm tra addressId
        if (!addressId) {
            throw new Error("Địa chỉ không hợp lệ");
        }

        // Gọi API với empty body
        const { data } = await api.post(`/api/order/create/${addressId}`);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

        // Chuyển hướng nếu có orderId
        if (data && data.id) {
            console.log("Redirecting to order summary, orderId:", data.id);
            window.location.href = `/checkout?step=3&orderId=${data.id}`;
        } else {
            console.error("Order created but no ID returned:", data);
        }

        return data;
    } catch (error) {
        console.error("Order creation error details:", {
            error: error,
            response: error.response,
            data: error.response?.data
        });

        let errorMessage;
        if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = "Không thể tạo đơn hàng";
        }

        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: errorMessage,
        });
        
        throw error;
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    try {
        const {data} = await api.get(`/api/order/${orderId}`);
        console.log("Order data: ", data);

        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
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
    dispatch({ type: ADD_ADDRESS_REQUEST });

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