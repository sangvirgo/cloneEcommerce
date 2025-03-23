import { FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, FIND_PRODUCT_FAILURE} from './ActionType';
import {api} from '../../config/ApiConfig';

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({type: FIND_PRODUCT_REQUEST});
    const {
        colors = [],
        sizes = [],
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        pageNumber,
        pageSize
    } = reqData;

    try {
        console.log("Sending API request with params:", {
            colorsStr: colors.join(','),
            sizesStr: sizes.join(','),
            minPrice,
            maxPrice,
            minDiscount,
            category,
            stock,
            sort,
            pageNumber,
            pageSize
        });
        
        const { data } = await api.get('/api/products', {
            params: {
                colorsStr: colors.length > 0 ? colors.join(',') : null,
                sizesStr: sizes.length > 0 ? sizes.join(',') : null,
                minPrice,
                maxPrice,
                minDiscount,
                category,
                stock,
                sort,
                pageNumber,
                pageSize
            }
        });
        
        console.log("API Response:", data);
        dispatch({type: FIND_PRODUCT_SUCCESS, payload: data});
    } catch (error) {
        console.error("API Error:", error);
        let errorMessage = "Có lỗi xảy ra";
        if (error.response) {
            console.error("Error response:", error.response.data);
            errorMessage = error.response.data.message || "Lỗi từ server";
        }
        dispatch({type: FIND_PRODUCT_FAILURE, payload: errorMessage});
    }
}



export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({type: FIND_PRODUCT_BY_ID_REQUEST});
    const {productId} = reqData;

    try {
        const { data } = await api.get(`/api/products/id/${productId}`);
        
        dispatch({type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message});
    }
}