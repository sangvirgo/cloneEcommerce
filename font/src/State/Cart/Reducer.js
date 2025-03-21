import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_FROM_CART_FAILURE, REMOVE_ITEM_FROM_CART_REQUEST, REMOVE_ITEM_FROM_CART_SUCCESS, UPDATE_ITEM_IN_CART_FAILURE, UPDATE_ITEM_IN_CART_REQUEST, UPDATE_ITEM_IN_CART_SUCCESS } from "./ActionType"

const initState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: [],
}

export const cartReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload.cartItems],
                loading: false
            }
        case ADD_ITEM_TO_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_CART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload.cart,
                cartItems: action.payload.cartItems,
                loading: false
            }
        case GET_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case REMOVE_ITEM_FROM_CART_REQUEST:
        case UPDATE_ITEM_IN_CART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_ITEM_FROM_CART_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
                loading: false
            };
        case UPDATE_ITEM_IN_CART_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>     
                    item.id === action.payload.id ? action.payload : item
                ),
                loading: false
            };
        
        case REMOVE_ITEM_FROM_CART_FAILURE:
        case UPDATE_ITEM_IN_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state
    }
}