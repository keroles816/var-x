import React,{useState} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import ProductframeGrid from "../product-list.js/productframegrid"
import { Button } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core"
const usestyle=makeStyles(theme=>({
recentlycontainer:{
   margin:'10rem 0',
   "& > :not(:last-child)":{
    marginRight: "1.5rem",
   }, 
},
arrow:{
    minWidth:0,
    height:'4rem',
    width:'4rem',
    fontSize:'4rem',
    color:theme.palette.primary.main,
    borderRadius:50,
    [theme.breakpoints.down('xs')]:{
        height:'1rem',
        width:'1rem',
    },
},




}))

export default function RecentlyViewed({products}){
    const classes=usestyle()
    const[firstIndex,setfirstIndex]=useState(0)
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const matchesSm=useMediaQuery(theme=>theme.breakpoints.down('sm'))
    
    const displayNum = matchesSm ? 1 : matchesMd ? 2 : 4 

    const handleNavigation=direction=>{
        if(firstIndex ===0 && direction==='backward') return null
        if(firstIndex + displayNum === products.length && direction === 'forward') return null
    setfirstIndex(direction==="forward"? firstIndex+1 :firstIndex-1)




    }
    return(
        <Grid 
        item 
        container
         justify='center'
          classes={{root:classes.recentlycontainer}}
          alignItems='center'
          >
            <Grid item >
               <Button onClick={()=> handleNavigation("backward")} classes={{root:classes.arrow}}>{"<"}</Button> 
            </Grid>
            { products ? products.slice(firstIndex,firstIndex + displayNum).map(product=>(
                <ProductframeGrid key={product.node.strapiId} 
                product={product}
                variant={product.node.variants[0]}
                disableQuickview
                small
                />
            )):null}
             <Grid item >
               <Button onClick={()=> handleNavigation("forward")} classes={{root:classes.arrow}}>{">"}</Button> 
            </Grid>
        </Grid>
    )
}