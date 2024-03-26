import axios from 'axios';

export const API_BASE_URL = 'http://localhost:4040'
const jwt = localStorage.getItem("jwt")

export const api =axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type' : "application/json"
    }

});