import { ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS } from "./ActionType"

const initialState = {
    cart:null,
    loading:false,
    error:null,
    cartItems:[],
}

const cartReducer = (state=initialState,action) => {
    switch(action.type){
        case ADD_ITEM_TO_CART_REQUEST:
            return {...state,loading:true,error:null};
        case ADD_ITEM_TO_CART_SUCCESS:
            return{...state,
                cartItems: [...state.cartItems,action.payload.cartItems],
                loading:false,
            };
        
    }
}