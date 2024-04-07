import { CANCELlED_ORDER_FAILURE, CANCELlED_ORDER_REQUEST, CANCELlED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SHIPPED_ORDER_FAILURE, SHIPPED_ORDER_REQUEST, SHIPPED_ORDER_SUCCESS } from "./ActionType";

const initialState = {
    loading : false,
    orders: [],
    error: "",
};

const adminOrderReducer = (state = initialState, action)=> {
    switch(action.type){
        case GET_ORDER_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case GET_ORDER_SUCCESS:
            return{
                loading: false,
                orders: action.payload,
                error:"",
            }
        case GET_ORDER_FAILURE:
            return{
                loading:false,
                orders: [],
                error: action.payload,
            };
        case DELIVERED_ORDER_REQUEST:
        case CANCELlED_ORDER_REQUEST:
            return{
                ...state,
                isLoading: true,
            };
        case DELIVERED_ORDER_SUCCESS:
            return{
                ...state,
                delivered: action.payload,
                isLoading: false,
            };
        case CANCELlED_ORDER_SUCCESS:
            return{
                ...state,
                canceled : action.payload,
                isLoading: false,
            }
        case DELIVERED_ORDER_FAILURE:
        case CANCELlED_ORDER_FAILURE:
            return{
                ...state,
                error: action.payload,
                isLoading:false,
            }
        case DELETE_ORDER_REQUEST:
            return {...state, loading:true};
        case DELETE_ORDER_SUCCESS:
            return{...state, loading:false, deletedOrder: state.orders.filter((order)=> order.id !== action.payload)};
        case DELETE_ORDER_FAILURE:
            return {...state, loading:false, error:action.payload};

        case SHIPPED_ORDER_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            }
        case SHIPPED_ORDER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                shipped: action.payload,
            }
        case SHIPPED_ORDER_FAILURE: 
            return{
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

export default adminOrderReducer;