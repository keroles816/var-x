import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { TextField,IconButton ,InputAdornment } from "@material-ui/core"
import Valdite from '../../components/ui/validate'

const usestyle=makeStyles(theme=>({
TextField:{
 width:({settings})=>settings ? "15rem" : "20rem",
 [theme.breakpoints.down('xs')]:{
      width:"15rem",
    },

},
input:{
    color:({iswhite})=>iswhite ? "#fff" : theme.palette.secondary.main
},
visibleicon:{
padding:0 ,

},



}))

export default function Fileds({
  fileds,
  errors,
  seterrors ,
  values,
    setvalues,
    iswhite,
    disabled,
    settings
  
  }){
    const classes=usestyle({iswhite,settings})


return(
     <>
    {Object.keys(fileds).map(filed=>{
            
            const validateHelper=event=>{

                 return Valdite({ [filed]:event.target.value})
                  

            }
           return !fileds[filed].hidden ? (

  <Grid item key={filed} >
         <TextField value={values[filed]} 
        onChange={e=>{
          const valid =validateHelper(e)
                     if(errors[filed] || valid[filed] ===true){
                  seterrors({...errors , [filed] : !valid[filed] })
                      
                    }
                   setvalues({...values,[filed] : e.target.value})
                }}
         classes={{root:classes.TextField}}
         onBlur={e=>{
          const valid=validateHelper(e)
             seterrors({...errors , [filed] : !valid[filed] })
        
        }}
         error={errors[filed]}
         helperText={errors[filed] && fileds[filed].helperText}
         type={fileds[filed].type}
         disabled={disabled}
         placeholder={fileds[filed].placeholder}
          InputProps={{
            startAdornment:(
           <InputAdornment position='start'>
              {fileds[filed].startAdornment}

           </InputAdornment> 

           
         ),
         endAdornment:fileds[filed].endAdornment ? (
           <InputAdornment position='end'>
             {fileds[filed].endAdornment}
           </InputAdornment>  
         ) : undefined,
        classes:{input:classes.input}
        }}
         />

        </Grid>

           ):null

     })}
    </>
     )
}