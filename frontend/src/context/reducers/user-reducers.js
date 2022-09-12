import { SET_USER } from "../actions/actions-types"




export default function userReducer(state,action){
const {user}= action.payload


let newstate={...state}
switch(action.type){
    case SET_USER:
        if(user.username ==="Guest"){
            localStorage.removeItem("user")

        }else{
            localStorage.setItem('user',JSON.stringify(user))
        }
        
        newstate=user

        return newstate
        
        default:
            return state
}
}