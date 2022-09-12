import React ,{useReducer,createContext} from 'react'
import cartreducer from '../reducers/cart-reducers'

export const CartContext=createContext()
const Cartprovider = CartContext.Provider


export function CartWrapper({children}){

    const storedCart =typeof window !== "undefined"? 
    JSON.parse(localStorage.getItem("cart")):
     null

  const [cart,dispatchcart]=useReducer(cartreducer,storedCart || [])  
  return <Cartprovider value={{cart,dispatchcart}}>{children}</Cartprovider>


}