import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "./ActionType"

const initState= {
    address: [],
    orders: [],
    order: null,
    error: null,
    loading: false,
}

export const orderReducer = (state=initState, action) => {
    switch(action.type) {
        case GET_ADDRESS_REQUEST:
        case ADD_ADDRESS_REQUEST:
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null,
                success: true
            }

        case GET_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: action.payload,
                error: null
            }
        case ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: [...state.address, action.payload],
                error: null
            }
        
        case GET_ADDRESS_FAILURE:
        case ADD_ADDRESS_FAILURE:
        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null
            }
        case GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}