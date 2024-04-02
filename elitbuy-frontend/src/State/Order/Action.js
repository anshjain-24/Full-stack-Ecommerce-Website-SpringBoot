import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "./ActionType";
import axios from 'axios';
import { api } from "../../Config/ApiConfig"
import { API_BASE_URL } from '../../Config/ApiConfig';


export const createOrder = (reqData) => async (dispatch) => {
    console.log("req data : "+reqData);
    dispatch({type:CREATE_ORDER_REQUEST});
    try{
    
        const { data } = await api.post(
           `/api/orders/`,
           reqData.address,
        );

        if(data.id){
            reqData.navigate({ search: `step=3&order_id=${data.id}` });
        }
        console.log("created order : ",data);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    }
    catch(error){
        console.log("caught error  :  ",error);
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message
        });
    }
};

export const createReOrder = (reqData) => async (dispatch) => {
    console.log("req data : "+reqData);
    dispatch({type:CREATE_ORDER_REQUEST});
    try{
    
        const { data } = await api.post(
           `/api/orders/withAddressId`,
           reqData.address.id,
        );

        if(data.id){
            reqData.navigate({ search: `step=3&order_id=${data.id}` });
        }
        console.log("created order : ",data);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    }
    catch(error){
        console.log("caught error  :  ",error);
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message
        });
    }
};



export const getOrderById = (orderId) => async (dispatch) => {
    console.log("get order reqest of id : ",orderId);
    dispatch({type: GET_ORDER_BY_ID_REQUEST});
    try{
        const { data } = await api.get(
            `api/orders/${orderId}`,
        );
        console.log("order by id ",data);
        dispatch({
            type:GET_ORDER_BY_ID_SUCCESS,
            payload: data,
        });
    }
    catch(error) { 
        console.log("catch ",error);
        dispatch({
            type: GET_ORDER_BY_ID_FAILURE,
            payload: error.message
        });
    }
};
