import {ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_FROM_CART_FAILURE, REMOVE_ITEM_FROM_CART_REQUEST, REMOVE_ITEM_FROM_CART_SUCCESS, UPDATE_ITEM_IN_CART_FAILURE, UPDATE_ITEM_IN_CART_REQUEST, UPDATE_ITEM_IN_CART_SUCCESS } from './ActionType';
import {api} from '../../config/ApiConfig';

export const getCart = () => async (dispatch) => {
    dispatch({type: GET_CART_REQUEST})

    try {
        const {data} = await api.get('/api/cart/');
        console.log("Cart data from API:", data);
        dispatch({type: GET_CART_SUCCESS, payload: data})
    } catch (error) {
        console.error("Error fetching cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể tải giỏ hàng";
        dispatch({type: GET_CART_FAILURE, payload: errorMessage})
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: ADD_ITEM_TO_CART_REQUEST})

    try {
        const cartData = {
            productId: reqData.productId,
            size: reqData.size,
            quantity: reqData.quantity || 1
        };
        
        const {data} = await api.post('/api/cart/add', cartData);
        console.log("Add to cart response:", data);
        dispatch({type: ADD_ITEM_TO_CART_SUCCESS, payload: data})
        return data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể thêm vào giỏ hàng";
        dispatch({type: ADD_ITEM_TO_CART_FAILURE, payload: errorMessage})
        throw error;
    }
}

export const removeItemToCart = (itemId) => async (dispatch) => {
    dispatch({type: REMOVE_ITEM_FROM_CART_REQUEST })

    try {
        const {data} = await api.delete(`/api/cart/remove/${itemId}`);
        console.log("Remove from cart response:", data);
        dispatch({type: REMOVE_ITEM_FROM_CART_SUCCESS, payload: itemId})
        return data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể xóa sản phẩm khỏi giỏ hàng";
        dispatch({type: REMOVE_ITEM_FROM_CART_FAILURE, payload: errorMessage})
        throw error;
    }
}

export const updateItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: UPDATE_ITEM_IN_CART_REQUEST })

    try {
        const updateData = {
            quantity: reqData.quantity
        };
        
        const {data} = await api.put(`/api/cart/update/${reqData.itemId}`, updateData);
        console.log("Update cart response:", data);
        dispatch({type: UPDATE_ITEM_IN_CART_SUCCESS, payload: data})
        return data;
    } catch (error) {
        console.error("Error updating cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể cập nhật giỏ hàng";
        dispatch({type: UPDATE_ITEM_IN_CART_FAILURE, payload: errorMessage})
        throw error;
    }
}