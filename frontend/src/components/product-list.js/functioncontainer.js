import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { useState } from 'react'
import IconButton from "@material-ui/core/IconButton"
import filter from '../../images/filter.svg'
import sort from '../../images/sort.svg'
import Sort from "./sort"
import Filter from "./filter"

const usestyle=makeStyles(theme=>({
functioncontainer:{
backgroundColor:theme.palette.primary.main,
minHeight:'6rem',
height:'auto',
borderRadius:({option})=>option !== null ?"10px":"10px 10px 0px 0px",

},



}))
export default function Fuctioncontainer({
  filteroptions,
  option,
  setoption,
  setfilteroption,
  sortoptions,
  setsortoptions
}){

const content=()=>{
switch(option){
     
        case "sort":
            return <Sort sortOptions={sortoptions} 
            
             setsortoptions={setsortoptions}          
            setoption={setoption}/>
            case "filter":
            return <Filter 
            setfilteroption={setfilteroption}
             setoption={setoption}
               filteroptions={filteroptions} />
    default:
        const items=[{icon:filter,alt:'filter'},{icon:sort,alt:'sort'}]
    return(
        <Grid item container 
        justify='space-around'
        alignItems="center"
        >
          {items.map(item=>(
          <Grid item key={item.alt}>
            <IconButton onClick={()=>setoption(item.alt)}>
                <img src={item.icon} alt={item.alt} />
            </IconButton>

          </Grid>
          ))}
        </Grid>
        
        )
}
}
const classes=usestyle({option})
return(
    <Grid 
    item container 
   classes={{root:classes.functioncontainer}}>

    {content()}

    </Grid>
)

}