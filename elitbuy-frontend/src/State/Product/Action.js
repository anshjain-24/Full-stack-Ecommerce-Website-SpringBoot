import { api } from "../../Config/ApiConfig";
import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({type:FIND_PRODUCTS_REQUEST})
    const { colors, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize } = reqData;
    try {
        const {data} = await api.get(`product/products?colors=${colors}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        // const {data} = await api.get(`product/products?colors=&sizes=&minPrice=0&maxPrice=1000000&minDiscount=0&category=Iphone&stock=null&sort=price_high&pageNumber=0&pageSize=4`)
        console.log("product data : ",data);
        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})
    }
    catch (error) {
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message})
    }
}

export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST})
    const { productId } = reqData;
    try {
        const {data} =await api.get(`/product/products/id/${productId}`)
        console.log("data : ",data)
        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
    }
    catch (error) {
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})
    }
}