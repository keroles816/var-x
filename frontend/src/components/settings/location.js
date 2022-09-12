import React,{useEffect, useState} from "react";
import Grid from'@material-ui/core/Grid'
import { Chip } from "@material-ui/core";
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import location from '../../images/location.svg'
import streatAdornment from '../../images/street-adornment.svg'
import zipAdornment from '../../images/zip-adornment.svg'
import Fileds from "../auth/fileds";
import Slot from "./slots";
import {FormControlLabel} from "@material-ui/core";
import{ Switch} from "@material-ui/core";
const usestyle=makeStyles(theme=>({

icon:{
    marginBottom:(checkout)=> checkout ? "1rem " :'3rem',
[theme.breakpoints.down('xs')]:{
        marginBottom:'1rem',
    },
},
chipwrapper:{
 marginTop:"2rem",  
 marginBottom:'3rem',

},
filedcontainer:{
    "& > :not(:first-child)":{
        marginTop:'2rem',
    }
},
slotcontainer:{
    position:'absolute', 
    bottom: ({checkout})=> checkout ? -8 : 0
},
locationcontianer:{
    position:'relative',
    [theme.breakpoints.down('md')]:{
    borderBottom:'4px solid #fff ',
    height: '30rem'
  },

},

switchWrapper:{
    marginRight: 4,
  },
  switchlabel:{
    color:'#fff',
    fontWeight: 600,

  },



}))

export default function Location({
    user,
    edit,
    setchagemade,
    values,
    setvalues,
    slot,
    setslot,
    checkout,
    billing,
    setbilling,

}){
    const classes=usestyle({checkout})
    
    
    const[errors,seterrors]=useState({})
   
    useEffect(()=>{
       setvalues(user.locations[slot])
    },[slot])


 useEffect(()=>{
    if(!checkout){
 const changed = Object.keys(user.locations[slot]).some(filed=>
      values[filed] !== user.locations[slot][filed] )
       
         setchagemade(changed)

    }
   
    

    },[values])


    const fileds={
        street:{
           placeholder:'Street',
           helperText:'invalid address',
           startAdornment: <img src={streatAdornment} alt="sreat Adornment"/>
        },
        zip:{
          placeholder:'Zip Code',
          helperText:"invalid zip code",
         startAdornment: <img src={zipAdornment} alt="zipAdornment"/>
        },
    }
    return(
        <Grid item container 
        justify='center'
        direction='column' 
        classes={{root: classes.locationcontianer}}
         lg={ checkout ? 12 : 6} 
        xs={12}
        alignItems='center'>
           <Grid item>
            <img src={location} 
            alt="location settings" 
            className={classes.icon}
            />
           </Grid>

           <Grid item container
            alignItems="center" 
            direction="column"
            classes={{root:classes.filedcontainer}}
            >

            <Fileds fileds={fileds}
             values={values}
             setvalues={setvalues}
             errors={errors}
             seterrors={seterrors}
             iswhite
             disabled={ checkout ? false : !edit}
             />

           </Grid>
           <Grid item classes={{root:classes.chipwrapper}}>
            <Chip label={values.city ? `${values.city},${values.state}`: "city,street"}/> 
           </Grid>
           <Grid item container  justify="space-between" classes={{root:classes.slotcontainer}}>

            
            <Slot slot={slot} setslot={setslot} checkout={checkout}/>


            {checkout && (
                  <Grid item>
                    <FormControlLabel 
                    classes={{root:classes.switchWrapper, 
                      label:classes.switchlabel }}
                    label="Billing"
                    labelPlacement="start"
                    control={ 
                    <Switch 
                    checked={billing}
                    onChange={ ()=>setbilling(!billing)}
                    color= "secondary"
                    />
                    }/>

                  </Grid>
                )}

           </Grid>
        </Grid>
    )
}