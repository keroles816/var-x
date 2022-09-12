import React,{useEffect, useState} from "react";
import axios from 'axios'
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import addusericon from '../../images/add-user.svg'
import nameAdorment from '../../images/name-adornment.svg'
import forword from '../../images/forward-outline.svg'
import backward from '../../images/backwards-outline.svg'
import { TextField } from "@material-ui/core"
import {InputAdornment} from "@material-ui/core";
import {Button }from "@material-ui/core";
import {IconButton} from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import Fileds from "./fileds"
import { EmailPassword } from "./Login"
import { setuser,setsnackbar } from "../../context/actions";
import clsx from 'clsx'

const usestyle=makeStyles(theme=>({

addusericon:{
  height:'10rem',
  width:'11rem' ,
  marginTop:'5rem',
 
},
TextField:{
  width:'20rem' 
},
input:{
  color:theme.palette.secondary.main
},
facebookSignup:{
  width:'20rem' ,
  borderRadius:50,
marginTop:'-3rem',
[theme.breakpoints.down('xs')]:{
      width:"15rem",
    },
},
facebooktext:{
  textTransform:'none',
  fontSize:'1.5rem',
  [theme.breakpoints.down('xs')]:{
      fontSize:"1.25rem",
    },
},
navagation:{
  height:'4rem',
  width:'4rem',
},
EmailAdornment:{
height:17 ,
width:22,
marginBottom:10,
},
visibleicon:{
padding:0 ,

},
removebuttonmargin:{
  marginTop:0
},

}))

export default function Signup({
  steps,
  setSelectedStep,
   
   dispatchuser,
   dispatchfeedback
}){
    const classes=usestyle()
    const[loading , setloading]=useState(false)

    const [values,setvalues]=useState({
        email:"",
        password:"",
        name:"",
    })
    const[errors,seterrors]=useState({})
      const [visible,setvisible]=useState(false)
    const [info,setinfo]=useState(false)

    const handeleNavigate=direction=>{
    if(direction==="forward"){
      setinfo(true)
    }else{
      if(info){
        setinfo(false)
      }else{
        const loginIndex=steps.find(step => step.label === "Login")

    setSelectedStep(steps.indexOf(loginIndex))
      }
      
    }
    }
    const namefiled={
      name:{
      helperText:'you must enter a name',
      placeholder:"name",
      startAdornment: ( 
      <img src={nameAdorment} alt="name-adorment" />
      ),

        }}
        const fileds=info ? EmailPassword(classes,false,false,visible,setvisible) 
        : namefiled

        const handlecomplete=()=>{
          setloading(true)
       axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local/register", {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then(response => {
         setloading(false)
   dispatchuser(setuser({...response.data.user,jwt:response.data.jwt}))
        
        const complete = steps.find(step => step.label === "complete")

        setSelectedStep(steps.indexOf(complete))
      })
      .catch(error => {
        const {message}=error.response.data.message[0].messages[0]
        setloading(false)
        console.error(error)
       dispatchfeedback(setsnackbar({status:"error",message}))
        
      })

      
        }
     const disabled=Object.keys(errors).some(error=>errors[error]===true)
     ||Object.keys(errors).length!==Object.keys(values).length

   return(
    <>
    <Grid item>
        <img src={addusericon} alt="new user"
         className={classes.addusericon} />
    </Grid>
   
  <Fileds
   fileds={fileds}
   errors={errors} 
   seterrors={seterrors}
   values={values}
   setvalues={setvalues}/>
     

     
    <Grid item>
     <Button 
     variant="contained"
      color='secondary'

      disabled={loading || info && disabled}
      onClick={ ()=> info ? handlecomplete() : null}
      classes={{root:clsx(classes.facebookSignup,
        {
          [classes.removebuttonmargin]:info
        })}}
      >

        {loading ?
         (<CircularProgress/>)
        :(
           <Typography classes={{root: classes.facebooktext}} 
           variant="h5">
    sign up { info ? "" :  "with Facebook"}
      </Typography>
        )}
     
     </Button>
     </Grid>
     <Grid item container justify='space-between'>

     <Grid item>
      <IconButton onClick={()=>handeleNavigate("backward")}>
      <img src={backward} alt="backward" 
      className={classes.navagation} />
      </IconButton>
     </Grid>
          {info ? null :
          (<Grid item>
      <IconButton onClick={()=>handeleNavigate("forward")}>
        <img src={forword} alt="forward"
         className={classes.navagation} />
      </IconButton>
     </Grid>
    
    ) }
        </Grid> 
    </>
   ) 
}