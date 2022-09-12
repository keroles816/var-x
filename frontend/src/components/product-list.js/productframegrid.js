import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import frame from "../../images/product-frame-grid.svg"
import { useState } from "react"
import QuickView from "./queick-view"
import clsx from 'clsx'
import { navigate } from "gatsby"
import { useMediaQuery } from "@material-ui/core";
const usestyles=makeStyles(theme=>({
frame:{
    //backgroundImage:`url(${frame})`,
    //backgroundPosition:'center',
    //backgroundSize: "contain",
   // backgroundRepeat:'no-repeat',
  // border: `2px solid ${theme.palette.secondary.main}`,
  // borderRadius:50,
    height:'25rem' ,
    width: '25rem',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    [theme.breakpoints.down('xs')]:{
     height:'20rem',
     width:"20rem",   
    },
    [theme.breakpoints.up('xs')]:{
        height:({small})=>small ? "15rem" : undefined,
        width:({small})=>small ? "15rem" : undefined
    },
    

},
product:{
    height:'20rem',
    width:'20rem',
    [theme.breakpoints.down('xs')]:{
     height:'15rem',
     width:"15rem",   
    },
     [theme.breakpoints.up('xs')]:{
        height:({small})=>small ? "12rem" : undefined,
        width:({small})=>small ? "12rem" : undefined
    },
},
title:{
 backgroundColor:theme.palette.primary.main,
 height:'5rem' ,
 width:'25rem',
  display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'-0.5rem',
    borderRadius:50,
    [theme.breakpoints.down('xs')]:{
    
     width:"20rem",   
    },

     [theme.breakpoints.up('xs')]:{
        
        width:({small})=>small ? "15rem" : undefined
    },
},
invisiblity:{
  visibility: 'hidden',
},


}))

export const colorIndex=(product,color)=>{
return product.node.variants.indexOf(
    product.node.variants.filter(item=>
        item.color === color  )[0])
}
export default function ProductframeGrid({
    product,
    variant,
    sizes,
  colors,
  selectedsize,
  setselectedsize,
  selectectedcolor,
  setselectedcolor,
  disableQuickview,
  small,
  stock

}){
   const[open,setopen]=useState(false)
    const classes=usestyles({small})
    const matchesMd=useMediaQuery(theme=>theme.breakpoints.down("md"))
    if(matchesMd && open ){
        setopen(false)
    }
     
    const imageIndex=colorIndex(product,selectectedcolor)
        
    const imageurl=process.env.GATSBY_STRAPI_URL
    +(imageIndex !==-1 ?
    product.node.variants[imageIndex].images[0].url:
    variant.images[0].url)

    
    const name=product.node.name.split('-')[0]
    return(

    <Grid item classes={{root:clsx({
        [classes.invisiblity]: open === true,
    })}} >
        <Grid container direction='column'
         onClick={()=> matchesMd ||disableQuickview
            ?
      navigate(`/${product.node.catgory.name.toLowerCase()}/${product.node.name
                  .split("-")[0]
                  .toLowerCase()}`) : setopen(true)}>

       <Grid item classes={{root:classes.frame}}>
        <img src={imageurl} 
        alt={product.node.name} className={classes.product}/>
       </Grid>
       <Grid item classes={{root:classes.title}}>
        <Typography variant="h4">
         {name}
        </Typography>
       </Grid>
        </Grid>
        <QuickView open={open}
         setopen={setopen} imageurl={imageurl}
         name={name}
          price={variant.price}
          variant={variant}
         product={product}
         sizes={sizes} 
         setselectedsize={setselectedsize}
          selectedsize={selectedsize}
          colors={colors} 
         setselectedcolor={setselectedcolor}
         selectectedcolor={selectectedcolor}
         stock={stock}
         imageIndex={imageIndex}
         />
    </Grid>
    )
}