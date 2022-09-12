import React,{useContext} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import Layout from '../components/ui/layout'
import { Usercontext } from "../context";
import Checkoutportol from "../components/cart/checkout-portol";
import CartItems from "../components/cart/cart-items";
const usestyle=makeStyles(theme=>({

cartcontainer:{
  minHeight:'70vh',
},



}))

export default function Cart(){
    const classes=usestyle()
    const {user}=useContext(Usercontext)
 
    return(
        <Layout>
            <Grid container classes={{root:classes.cartcontainer}}  direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h1">
                    {user.username}'s cart
                  </Typography>

                </Grid>
                <Grid item container>
                   <CartItems/>
                   <Checkoutportol user={user}/>
                </Grid>
            </Grid>
        </Layout>
    )
    
}