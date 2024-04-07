import { CANCELlED_ORDER_FAILURE, CANCELlED_ORDER_REQUEST, CANCELlED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SHIPPED_ORDER_FAILURE, SHIPPED_ORDER_REQUEST, SHIPPED_ORDER_SUCCESS } from "./ActionType";
import { api } from "../../../Config/ApiConfig"

export const getAllOrders = () => {
    console.log("getting all orders..")
    return async (dispatch) => {
        dispatch({type: GET_ORDER_REQUEST});
        try{
            const response = await api.get(`/api/admin/orders/`);
            console.log("got all order data: ",response.data)
            dispatch({type: GET_ORDER_SUCCESS, payload:response.data});
        }
        catch(error){
            console.log("error caught : ",error);
            dispatch({type: GET_ORDER_FAILURE, payload: error.message});
        }
    };
};

export const shipOrder = (orderId) => {
    console.log("get orderId ",orderId)
    return async (dispatch) => {
        dispatch({type: SHIPPED_ORDER_REQUEST});
        try{
            const response = await api.put(`/api/admin/orders/${orderId}/ship`);
            const data = response.data
            console.log("Shipped order data: ",data)
            dispatch({type: SHIPPED_ORDER_SUCCESS, payload:response.data});
        }
        catch(error){
            console.log("error caught : ",error);
            dispatch({type: SHIPPED_ORDER_FAILURE, payload: error.message});
        }
    };
};

export const deliverOrder = (orderId) => {
    console.log("get orderId for delivery ",orderId)
    return async (dispatch) => {
        dispatch({type: DELIVERED_ORDER_REQUEST});
        try{
            const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
            const data = response.data
            console.log("Delivered order data: ",data)
            dispatch({type: DELIVERED_ORDER_SUCCESS, payload:response.data});
        }
        catch(error){
            console.log("error caught : ",error);
            dispatch({type: DELIVERED_ORDER_FAILURE, payload: error.message});
        }
    };
};

export const cancelOrder = (orderId) => {
    console.log("get orderId for cancellation ",orderId)
    return async (dispatch) => {
        dispatch({type: CANCELlED_ORDER_REQUEST});
        try{
            const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
            const data = response.data
            console.log("Cancelled order data: ",data)
            dispatch({type: CANCELlED_ORDER_SUCCESS, payload:response.data});
        }
        catch(error){
            console.log("error caught : ",error);
            dispatch({type: CANCELlED_ORDER_FAILURE, payload: error.message});
        }
    };
};

export const deleteOrder = (orderId) => {
    console.log("get orderId for deleting the order ",orderId)
    return async (dispatch) => {
        dispatch({type: DELETE_ORDER_REQUEST});
        try{
            const {data} = await api.delete(`/api/admin/orders/${orderId}/delete`);
            console.log("Deleted order data: ",data)
            dispatch({type: DELETE_ORDER_SUCCESS, payload:data});
        }
        catch(error){
            console.log("error caught : ",error);
            dispatch({type: DELETE_ORDER_FAILURE, payload: error.message});
        }
    };
};