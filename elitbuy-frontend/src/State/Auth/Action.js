import axios from 'axios'
import { API_BASE_URL } from '../../Config/ApiConfig';
import {GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS} from './ActionType';

const token = localStorage.getItem("jwt");

const registerRequest = () => ({type:REGISTER_REQUEST});
const registerSuccess = (user) => ({type:REGISTER_SUCCESS,payload:user});
const registerFailure = (error) => ({type:REGISTER_FAILURE,payload:error});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest())
        try{
            const response = await axios.post(`${API_BASE_URL}/auth/signup`,userData)
            const user = response.data;
            if(user.jwt){
                localStorage.setItem("jwt",user.jwt);
            }
            console.log("registered user : ",user);
            dispatch(registerSuccess(user.jwt))
        }
        catch (error) {
            dispatch(registerFailure(error.message))
        }
}

const LoginRequest = () => ({type:LOGIN_REQUEST});
const LoginSuccess = (user) => ({type:LOGIN_SUCCESS,payload:user});
const LoginFailure = (error) => ({type:LOGIN_FAILURE,payload:error});


export const login = (userData) => async  (dispatch) => {
    dispatch(LoginRequest())
        try{
            const response = await axios.post(`${API_BASE_URL}/auth/login`,userData)
            const user = response.data;
            console.log("jwt here : ",user.jwt)
            if(user.jwt){
                localStorage.setItem("jwt",user.jwt);
            }
            console.log("registered user : ",user);
            dispatch(LoginSuccess(user.jwt))
        }
        catch (error) {
            dispatch(LoginFailure(error.message))
        }
}


const GetUserRequest = () => ({type:GET_USER_REQUEST});
const GetUserSuccess = (user) => ({type:GET_USER_SUCCESS,payload:user});
const GetUserFailure = (error) => ({type:GET_USER_FAILURE,payload:error});


export const getUser = (jwt) => async  (dispatch) => {
    dispatch(GetUserRequest())
        try{
            const response = await axios.get(`${API_BASE_URL}/api/profile`,{
                headers:{
                "Authorization" : `Bearer ${jwt}`
            }})
            const user = response.data;
            console.log("registered user : ",user);
            dispatch(GetUserSuccess(user))
        }  catch (error) {
            dispatch(GetUserFailure(error.message))
        }
}

export const logout = () => (dispatch) => {
        dispatch({type:LOGOUT,payload:null})
}