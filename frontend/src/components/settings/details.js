import React,{useState,useEffect} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import {useMediaQuery }from "@material-ui/core";
import fingerprint from '../../images/fingerprint.svg'
import Fileds from '../auth/fileds'
import clsx from 'clsx'
import{ FormControlLabel} from "@material-ui/core"
import {Switch} from "@material-ui/core"
import {EmailPassword} from '../auth/Login'
import NameAdornment from '../../images/nameadornment'
import PhoneAdorment from '../../images/phoneAdorment'
import { Button } from "@material-ui/core";
import Slot from "./slots";

const usestyle=makeStyles(theme=>({

     phoneadornment:{
         height:25.122 ,
         width:25.173,
    },
visibleIcon:{
    padding:0 ,
},
EmailAdornment:{
  height:17,
  width:22,
  marginBottom:10,

},
icon:{
  marginTop:({checkout})=>checkout ? "-2rem" : undefined,
    marginBottom:({checkout})=>checkout ? "1rem": '2rem',
    [theme.breakpoints.down('xs')]:{
        marginBottom:'1rem',
    },
},
filedcontainer:{
    marginBottom:'2rem',

"& > :not(:first-child)":{
    marginLeft: "5rem"
},

[theme.breakpoints.down('xs')]:{
  marginBottom:"1rem",
"& > :not(:first-child)":{
    marginLeft: 0,
    marginTop:'1rem',
},
},


},
slotcontainer:{
  position:'absolute',
  bottom:({checkout})=>checkout ? -8 : 0,

},
detailscontainer:{
  position:'relative',
  [theme.breakpoints.down('md')]:{
    borderBottom:'4px solid #fff ',
    height:'30rem',
  },
  
}, 


"@global":{

  ".MuiInput-underline:before, MuiInput-underline:hover:not(.Mui-disabled):before":{
    borderBottom:'2px solid #fff',
  },
  ".MuiInput-underline:after":{
    borderBottom:`2px solid ${theme.palette.secondary.main}`
  },
  "MuiInput-multiline":{
    border:'2px solid #fff',
    padding: '1rem',
  },
},
filedcontainercart:{
  " & > *":{
    marginBottom:"1rem",
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

export default function Details({
  user,
  edit,
  setchagemade,
  values
  ,setvalues,
  slot,
  setslot,
  checkout,
   Billing,
   setBilling,

}){
    const classes=usestyle({checkout})
     const matcheslGXS=useMediaQuery(theme=>theme.breakpoints.down("xs"))

      const [visible,setvisible]=useState(false)
   
    const [errors,seterrors]=useState({})

    useEffect(()=>{
      if(checkout){
        setvalues(user.contactinfo[slot])

      }else{
         setvalues({...user.contactinfo[slot], password:"********"})
      }

     

    },[slot])

    useEffect(()=>{
      if(checkout) return

     const changed = Object.keys(user.contactinfo[slot]).some(filed=>
      values[filed] !== user.contactinfo[slot][filed] )
       
        setchagemade(changed)
    

    },[values])

    const email_password=EmailPassword(classes,
        false,
        false
        ,visible,
        setvisible,
        true,
        
        )
    const name_phone = {
        name:{
         helperText:'you must enter a name',
         placeholder:"Name",
         startAdornment: <NameAdornment color='#fff' />
        },
        phone:{
           helperText:'invalid phone number',
           placeholder:'phone',
           startAdornment:(
            
        <div className={classes.phoneadornment}>
            <PhoneAdorment/>
        </div>

           )
         },
    }
   

    let fileds = [name_phone, email_password]
    if(checkout){
      fileds=[{
        name: name_phone.name,
         email:email_password.email,
         phone:name_phone.phone,
        
        }]
    }
    return (
        <Grid item container 
        direction="column" 
        lg={ checkout ? 12 : 6} 
        xs={12} 
        classes={{root:classes.detailscontainer}}
        alignItems='center'
        justify='center'>
           <Grid item>
            <img src={fingerprint}
             alt="detail settings"
             className={classes.icon}
             />
            </Grid> 
            {fileds.map((pair,i)=>(
                <Grid container justify='center' 
                classes={{root:clsx({
                  [classes.filedcontainercart]:checkout,
                  [classes.filedcontainer]:!checkout,
                })}}
                direction={matcheslGXS || checkout ? 'column' : "row"}
                key={i}
                alignItems={matcheslGXS || checkout ? 'center' : undefined }
                >

                   <Fileds

                    fileds={pair}
                   values={values}
                   setvalues={setvalues}
                   errors={errors}
                   seterrors={seterrors}
                   iswhite
                   disabled={checkout ? false : !edit}
                   settings={!checkout}
                   />   
                </Grid>
            ))}
            <Grid container  justify={checkout ? 'space-between' : undefined} classes={{root:classes.slotcontainer}}>
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
                    checked={Billing}
                    onChange={ ()=>setBilling(!Billing)}
                    color= "secondary"
                    />
                    }/>

                  </Grid>
                )}
            </Grid>
        </Grid>
    )
}