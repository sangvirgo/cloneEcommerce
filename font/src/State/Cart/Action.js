import {ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_FROM_CART_FAILURE, REMOVE_ITEM_FROM_CART_REQUEST, REMOVE_ITEM_FROM_CART_SUCCESS, UPDATE_ITEM_IN_CART_FAILURE, UPDATE_ITEM_IN_CART_REQUEST, UPDATE_ITEM_IN_CART_SUCCESS } from './ActionType';
import {api} from '../../config/ApiConfig';

export const getCart = () => async (dispatch) => {
    dispatch({type: GET_CART_REQUEST})

    try {
        const {data} = await api.get('/api/cart/');
        dispatch({type: GET_CART_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_CART_FAILURE, payload: error.message})
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: ADD_ITEM_TO_CART_REQUEST})

    try {
        const {data} = await api.post('/api/cart/add', reqData.data);
        dispatch({type: ADD_ITEM_TO_CART_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: ADD_ITEM_TO_CART_FAILURE, payload: error.message})
    }
}



export const removeItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: REMOVE_ITEM_FROM_CART_REQUEST })

    try {
        const {data} = await api.delete(`/api/cart/remove/${reqData.itemId}`);
        dispatch({type: REMOVE_ITEM_FROM_CART_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: REMOVE_ITEM_FROM_CART_FAILURE, payload: error.message})
    }
}


export const updateItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: UPDATE_ITEM_IN_CART_REQUEST })

    try {
        const {data} = await api.put(`/api/cart/update/${reqData.itemId}`);
        dispatch({type: UPDATE_ITEM_IN_CART_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UPDATE_ITEM_IN_CART_FAILURE, payload: error.message})
    }
}