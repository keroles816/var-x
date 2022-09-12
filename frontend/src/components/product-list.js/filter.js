import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import filter  from '../../images/filter.svg'
import close from '../../images/close-outline.svg'
import Chip from '@material-ui/core/Chip'
import  FormControl  from "@material-ui/core/FormControl"
import  FormControlLabel  from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import  Checkbox  from "@material-ui/core/Checkbox"


const usestyles=makeStyles(theme=>({


maincontainer:{
    padding: '1rem  0'
},
checkbox:{
   color:'#fff' ,
},
optioncontainer:{
  [theme.breakpoints.down('xs')]:{
  "& >:not(:last-child)":{
         marginBottom:"2rem",
  },
  },
},


}))
export default function Filter({setoption,filteroptions,
  setfilteroption
}){

const classes=usestyles()
const handeleFilter=(option,i)=>{
const newfilters={...filteroptions}
newfilters[option][i].checked=!newfilters[option][i].checked
setfilteroption(newfilters)
}
return(
<Grid item container justify="space-between" alignItems="center"
classes={{root:classes.maincontainer}}
>
<Grid item>
    <IconButton onClick={()=>setoption(null)}>
        <img src={filter} alt="filter" />
    </IconButton>
</Grid>
<Grid item xs>
    <Grid   container 
    justify="space-around"
    classes={{root:classes.optioncontainer}}
    >
      {Object.keys(filteroptions).filter(option=>filteroptions[option]!==null).map(option=>(
        <Grid item key={option}>
            <Grid container direction="column">
                <Grid item>
                  <Chip label={option} />
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormGroup>
                       {filteroptions[option].map(({label,checked},i)=>(
                          <FormControlLabel 
                          classes={{label:classes.checkbox}}
                          key={label} label={label}
                          control={
                          <Checkbox classes={{root:classes.checkbox}} 
                          checked={checked} 
                          name={label}
                          onChange={()=>handeleFilter(option,i)}

                          />}
                          >

                          </FormControlLabel>
 
                       ))} 
                    </FormGroup>
                  </FormControl>
                </Grid>
            </Grid>
            
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