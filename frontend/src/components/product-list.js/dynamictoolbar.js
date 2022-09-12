import React, { useState } from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import Fuctioncontainer from "./functioncontainer";
import DescriptionContainer from "./description-container";
const usestyle=makeStyles(theme=>({
toolbar:{

    border:`5px solid ${theme.palette.primary.main}`,
    borderRadius:25,
    width:'95%',
    height:'auto',
    marginBottom:'5rem',
    
},



}))
export default function DynamicToolbar({
    filteroptions,
    setfilteroption,
    name,
    description,
    layout,
    setlayout,
     sortoptions,
  setsortoptions
  
}){

const classes=usestyle()
const[option,setoption]=useState(null)
return(
    <Grid item container direction="column" classes={{root:classes.toolbar}}>
 
<Fuctioncontainer 
option={option}
 setoption={setoption}
 filteroptions={filteroptions} 
 setfilteroption={setfilteroption}
 sortoptions={sortoptions}
 setsortoptions={setsortoptions}
 />
 {option===null && <DescriptionContainer 
 layout={layout} 
 setlayout={setlayout} 
 name={name} descrption={description}

 />}

    </Grid>
)

}