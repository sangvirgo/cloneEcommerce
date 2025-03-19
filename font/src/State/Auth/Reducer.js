import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null
}

export const authReducer = (state = initialState, action) => {
    console.log("Auth Reducer: ", action.type, action.payload);

    switch(action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
            
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                jwt: action.payload,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload
            }

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
            
        case GET_USER_FAILURE:
            // Nếu lỗi khi lấy thông tin người dùng, có thể token đã hết hạn
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                jwt: null,  // Xóa JWT khỏi state
                user: null  // Xóa thông tin user khỏi state
            }

        case LOGOUT:
            return initialState;
            
        default:
            return state;
    }
}