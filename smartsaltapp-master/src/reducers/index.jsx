import { combineReducers } from "redux";
import salternReducer from './salternReducer';

const rootReducer = combineReducers({
    saltern: salternReducer
})

export default rootReducer;