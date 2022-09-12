import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import sort from '../../images/sort.svg'
import close from '../../images/close-outline.svg'
import Chip from '@material-ui/core/Chip'
import { useMediaQuery } from "@material-ui/core"
import clsx from 'clsx'
const usestyle=makeStyles(theme=>({

chipcontainer:{
    [theme.breakpoints.down('md')]:{
        margin:'0.5rem', 

    },
    
},
notactive:{
    backgroundColor:theme.palette.primary.main
},



}))
export default function Sort({setoption,sortOptions, 
    setsortoptions}){
const classes=usestyle()
const matchesXs=useMediaQuery(theme=>theme.breakpoints.down('xs'))

const handleSort=i=>{

    const newoptions=[...sortOptions]
    newoptions.map(option=>option.active=false)
    newoptions[i].active=true
    setsortoptions(newoptions)
}
return(
<Grid item container justify="space-between" alignItems="center">
<Grid item>
    <IconButton onClick={()=>setoption(null)}>
        <img src={sort} alt="sort" />
    </IconButton>
</Grid>
<Grid item xs >
    <Grid container direction={matchesXs ? "column" : 'row'} 
       alignItems={matchesXs ? 'center' : undefined} justify="space-around">
       {sortOptions.map((option,i)=>(
        <Grid
         classes={{root:classes.chipcontainer}}
          item
           key={option.label}>
            <Chip label={option.label} 
            color={option.active!==true ?'primary':"secondary"}
            onClick={()=>handleSort(i)}
            classes={{root:clsx({
                [classes.notactive]:option.active!==true
            })}} />
        </Grid>
       ))}
    </Grid>
</Grid>
<Grid item>
    <IconButton onClick={()=>setoption(null)}>
        <img src={close} alt="close" />
    </IconButton>
</Grid>
</Grid>
)
}


