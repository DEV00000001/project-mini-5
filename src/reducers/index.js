// #TODO: TAO RA BIEN ALL REDUCER , gom tat ca reducer vao 
import {combineReducers} from "redux"
import UserReducer from "./User";

const allReducers = combineReducers(
    {
        UserReducer
    }
)
export default allReducers;
