import React,{useContext} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"

import {CartContext} from "../../context";
import Item from './items'

const usestyle=makeStyles(theme=>({





}))

export default function CartItems(){
    const {cart} =useContext(CartContext)
    const classes=usestyle()
    
    return(
        <Grid direction="column" item container xs={6}>
          {cart.map(item=>(
            <Item key={item.variant.id} item={item}/>
          ))}
        </Grid>
    )
}