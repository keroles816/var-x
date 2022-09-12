import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import shippingIcon from '../../images/shipping.svg'
import { Button } from "@material-ui/core";
import clsx from "clsx"

const usestyle=makeStyles(theme=>({

button:{
    backgroundColor:theme.palette.secondary.main,
    borderRadius:15,
    height:"10rem",
    width:'10rem',
    "&:hover":{
       backgroundColor: theme.palette.secondary.light
    },
},
    label:{
    fontSize:'1.5rem',

},
    container:{
    height: "100%",
},

   icon:{
    marginTop:'-2rem',
    marginBottom:"1rem",
},
   price:{
 color:"#fff",

},
   slected:{
     backgroundColor:"#fff",

"&:hover":{
       backgroundColor: "#fff"
    },

    },
      slectedtext:{
     color:theme.palette.secondary.main,
},
}))

export default function Shipping({
     shippingoptions,
     selectedshipping,
     setselectedshipping,
}){
    const classes=usestyle()
    return(
        <Grid 
        item 
        alignItems="center"
         justify='center'
          container
           direction="column"
           classes={{root:classes.container}}
           
           >
            <Grid item>
               <img className={classes.icon} src={shippingIcon} alt="shipping" /> 
            </Grid>
            <Grid item justify='space-around'  container>
            {shippingoptions.map(option=>(
                <Grid item key={option.label}>
                   <Button 
                   onClick={()=>setselectedshipping(option.label)}
                   classes={{root:clsx(classes.button,{
                    [classes.slected]:selectedshipping === option.label
                   }) }} >
                    <Grid container direction="column">
                        <Grid item>
                            <Typography 
                            variant='h5' 
                            classes={{root:clsx(classes.label,{
                                [classes.slectedtext]:selectedshipping === option.label
                            })}}>

                                {option.label}
                            </Typography>
                           
                        </Grid>
                        <Grid item>

                           <Typography 
                            variant='body1' 
                            classes={{root:clsx(classes.price,{
                                [classes.slectedtext]:selectedshipping === option.label
                            })}}>

                          {`$${option.price.toFixed(2)}`}
                              
                            </Typography>

                            
                        </Grid>
                    </Grid>
                   </Button>
                </Grid>
            ))}
            </Grid>
        </Grid>
    )
}