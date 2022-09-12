import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core";
import clsx from 'clsx'

const usestyle=makeStyles(theme=>({
swatches:{
  border:'3px solid #fff',
  height:'3rem',
  width:'3rem',
  minWidth:0,
  borderRadius:50,
},
swatchescontainer:{
  marginTop:0,
  "&:not(:first-child)":{
    marginLeft: "-0.5rem",
  },
  
},

selected:{
   borderColor:theme.palette.secondary.main,
    
  },
}))

export default function Swatches({colors,selectectedcolor,setselectedcolor}){
    const classes=usestyle()
    return(
        <Grid item container >
          {colors.sort().map(color=>(
            <Grid key={color} item classes={{root:classes.swatchescontainer}}>
                <Button 
                onClick={()=> setselectedcolor(color)}
                classes={{root:clsx(classes.swatches,{
                  [classes.selected]:selectectedcolor ===color
                })}}
                style={{backgroundColor:color}} />    
            </Grid>
          ))}
        </Grid>
    )
}