import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core";
import clsx from 'clsx'

const usestyle=makeStyles(theme=>({

slot:{
    backgroundColor:'#fff',
    borderRadius: 25,
    width:"2.5rem",
    height:'2.5rem',
    minWidth:0,
    border:`0.15rem solid ${theme.palette.secondary.main}`,
    "&:hover":{
        backgroundColor:'#fff'

    }
},
slottext:{

  color:theme.palette.secondary.main ,
  marginLeft:"-0.25rem",
},
slotwrapper:{
    marginLeft:'1rem',
    marginBottom:'1rem',
    "& > :not(:first-child)":{
        marginLeft:'-0.5rem',
    }
},
selected:{
  backgroundColor:theme.palette.secondary.main,
  "&:hover":{
        backgroundColor:theme.palette.secondary.main,

    }
},
selectedtext:{
    color:'#fff'
},

shipping:{
    color:'#fff',
    fontWeight:600,
    marginLeft:'0.5rem',
},
}))

export default function Slot({
    slot,
    setslot,
    checkout,
    nolabel,
}){
    const classes=usestyle()

    return(
             
     <Grid item container xs={ nolabel ? 3 : checkout ? 5 : undefined}>
      
      <Grid item classes={{root:classes.slotwrapper}}>
                    {[1,2,3].map(number=>(
                        <Button
                        onClick={()=>setslot(number-1)}
                         classes={{root:clsx(classes.slot,
                            {
                                [classes.selected]:slot===number-1
                            
                            })}}
                        key={number}>
                          <Typography variant="h5" 
                          classes={{root:clsx(classes.slottext,{
                            [classes.selectedtext]:slot===number-1
                          })}}>
                            {number}
                          </Typography>
                        </Button>
                    ))}
                </Grid>
                {checkout && (
                    <Grid item >
                        <Typography 
                        variant="body1"
                         classes={{root:classes.shipping}} >
                            Shipping
                        </Typography>
                        </Grid>
                )}


                </Grid>
                 
    )
    
}




