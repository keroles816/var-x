import { ADD_TO_CART,REMOVE_FROM_CART,CLEAR_CART } from "../actions/actions-types"



export default function cartreducer(state,action){
let newcart = [...state]
let existingindex

if(action.payload){
    existingindex =
    state.findIndex(item => item.variant === action.payload.variant )
}
const savedata = cart =>{

    localStorage.setItem('cart',JSON.stringify(cart))
}
switch(action.type){
    case ADD_TO_CART:
        if(existingindex !== -1){
         let newqty=newcart[existingindex].qty + action.payload.qty
         if(newqty > action.payload.stock){
            newqty=action.payload.stock
         }
         newcart[existingindex]={...newcart[existingindex], qty:newqty}
        }else{
         newcart.push(action.payload)
        }
        savedata(newcart)
        return newcart
        case REMOVE_FROM_CART:
            const newqty= newcart[existingindex].qty-action.payload.qty
                if(newqty <= 0){
                    newcart=newcart.filter(item => item.variant !== action.payload.variant )

                }
                else{
                  newcart[existingindex]={...newcart[existingindex],qty:newqty}  
                }
                savedata(newcart)
                return newcart
            case CLEAR_CART :
                localStorage.removeItem("cart")
                return []
                default:
                    return state
}
}