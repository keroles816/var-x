import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { IconButton } from "@material-ui/core";


const usestyle=makeStyles(theme=>({

selected:{
    height:'40rem',
    width:'40rem',

    [theme.breakpoints.down('sm')]:{
       height:'30rem',
    width:'30rem', 
    },

     [theme.breakpoints.down('xs')]:{
       height:'20rem',
    width:'20rem', 
    },
},
small:{
height:'5rem',
width:'5rem',
 [theme.breakpoints.down('xs')]:{
       height:'3rem',
    width:'3rem', 
},

},
imagecontainer:{
    margin:'1rem'
},



}))

export default function ProductImages({
    images,
    selectedImage,
     setselectedImage}){
        
    const classes=usestyle()


    return(
     <Grid 
     item 
     container 
     direction="column"
      alignItems="center"
     lg={6}
      >
        <Grid item>
            <img src={process.env.GATSBY_STRAPI_URL
            +images[selectedImage].url}
            alt='product-Large'
             className={classes.selected}
            />
        </Grid>
        <Grid item container  justify="center" >
            {images.map((image,i)=>(

            <Grid item classes={{root:classes.imagecontainer}} key={image.url}>
                <IconButton onClick={()=>setselectedImage(i)}>
               <img src={process.env.GATSBY_STRAPI_URL+image.url}
               alt={`product-small${i}`}
                className={classes.small}
               />
               </IconButton>
            </Grid>

               
            ))}
        </Grid>
     </Grid>
    )
    
}