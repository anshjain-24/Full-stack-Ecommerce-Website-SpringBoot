import { legacy_createStore ,applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { customerProductReducer } from './Product/Reducer';


const rootReducers = combineReducers({
        auth:authReducer,
        product:customerProductReducer
})

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk));
