import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import  Button  from "@material-ui/core/Button"
import clsx from 'clsx'

const usestyle=makeStyles(theme=>({
size:{
    color:'#fff',
},

button:{
    border:'3px solid #fff',
    borderRadius:50,
    height:'3rem',
    width:"3rem" ,
    minWidth:0,
},
selected:{
    backgroundColor:theme.palette.secondary.main,
    "&:hover":{
       backgroundColor:theme.palette.secondary.light, 
    },
},


}))

export default function Sizes({sizes,selectedsize,setselectedsize}){
    const classes=usestyle()
    
    const posibalesizes=["s","m","l"]
    

 var actualsizes=[]

if ( posibalesizes.every(size=>sizes.includes(size))){
    actualsizes=posibalesizes
}
    return(
        <Grid item container justify="space-between">
          {actualsizes.map(size=>(
            <Grid item key={size}>
                <Button onClick={()=>setselectedsize(size)}
                 classes={{root:clsx(classes.button,{
                 [classes.selected]:selectedsize===size

                 })}}>
                    <Typography variant='h3' classes={{root:classes.size}}>
                      {size}
                    </Typography>
                </Button>
            </Grid>
          ))}
        </Grid>
    )
}