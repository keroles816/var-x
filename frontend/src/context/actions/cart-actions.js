import {ADD_TO_CART,REMOVE_FROM_CART,CLEAR_CART} from './actions-types'


export const addtocart=(variant,stock,qty,name)=>({
    type:ADD_TO_CART,
    payload:{variant,qty,stock,name}
})

export const removefromcart = (variant,qty)=>({
type:REMOVE_FROM_CART,
payload:{variant,qty}

})
export const clearcart =()=>({
    type:CLEAR_CART
})