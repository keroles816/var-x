import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core";


const usestyle=makeStyles(theme=>({


 navbar:{
   backgroundColor:theme.palette.secondary.main,
    width:'40rem',
    height:'5rem' ,
   },
   back:{
    visibility: ({selectedstep,steps})=>
    selectedstep === 0 ||selectedstep === steps.length-1  ? "hidden" :"visible"
   },
   forward:{
     visibility: ({selectedstep,steps})=>
    selectedstep >= steps.length - 2 ? "hidden" :"visible"
   },

disabled:{
    opacity:"0.5",
},

}))

export default function CheckoutNavagation({
    steps, 
    setselectedstep, 
     selectedstep
}){
    const classes=usestyle({ selectedstep,steps})
    return (
        <Grid item container alignItems="center" justify='center' classes={{root:classes.navbar}}>
        <Grid item classes={{root:classes.back}}>
            <Button onClick={()=>setselectedstep(selectedstep - 1) }>
            <Typography variant="h5">
                {"<"}
            </Typography>
            </Button>
        </Grid>
        <Grid item>
            
            <Typography variant="h5">
                {steps[selectedstep].title.toUpperCase()}
            </Typography>
           
        </Grid>
         <Grid item classes={{root:classes.forward}}>
            <Button 
           
            onClick={()=>setselectedstep(selectedstep + 1) }>
            <Typography variant="h5">
                {">"}
            </Typography>
             </Button>
        </Grid>
        </Grid>
    )
}