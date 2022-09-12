import React,{useState,useEffect} from "react";
import axios from 'axios'
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import {EmailPassword} from './Login'
import { makeStyles } from "@material-ui/core/styles"
import Fileds from "./fileds";
import  accounticon from '../../images/account.svg'
import { Button } from "@material-ui/core"
import { setsnackbar } from "../../context/actions"
import {CircularProgress} from "@material-ui/core"
const usestyle=makeStyles(theme=>({
Reset:{
    widh:"20rem" ,
    borderRadius:50,
    textTransform:'none',
    marginBottom: "4rem",
    [theme.breakpoints.down('xs')]:{
      width:"15rem",
    },


},
icon:{
    marginTop:'2rem'

},


buttontext:{
     [theme.breakpoints.down('xs')]:{
      fontSize:"1.25rem",
    },
    },


}))

export default function Reset({ steps,
    setSelectedStep,dispatchfeedback}){
    const classes=usestyle()
    const [visible,setvisible]=useState(false)
    const [values,setvalues]=useState({password:'',confirmation:""})
    const [errors,seterrors]=useState({})
    const {password}=EmailPassword(classes,true,false,visible,setvisible)
    const [loading,setloading]=useState(false)
    const [success,setsuccess]=useState(false)
    const fileds={password,
        confirmation:{...password,placeholder:'confirm password'}}
        const handleReset=()=>{
           setloading(true)
            const params=new URLSearchParams(window.location.search)
            const code=params.get("code")
          axios
    .post(process.env.GATSBY_STRAPI_URL + "/auth/reset-password",{
         code,
         password:values.password,
         passwordConfirmation:values.confirmation
    }).then(res=>{
        setloading(false)
        setsuccess(true)
       dispatchfeedback(setsnackbar({status:'success', message:"password Reset Successfully"}))

   
    
    
 }).catch(error=>{
    setloading(false)
         const {message}=error.response.data.message[0].messages[0]
        console.error(error)
      
         dispatchfeedback(
            setsnackbar({
            status:"error",
            message,
         }))

    })



        }

  const disabled=
     Object.keys(errors).some(error=>errors[error]===true)
     ||Object.keys(errors).length!==Object.keys(values).length||
     values.password!==values.confirmation


     useEffect(()=>{
     if(!success) return

     const timer = setTimeout(()=>{
      window.history.replaceState(null,null,window.location.pathname)
     const loginIndex=steps.find(step => step.label === "Login")

    setSelectedStep(steps.indexOf(loginIndex))
    },6000)
 

    return ()=>clearTimeout(timer)

     },[success])
        return(
            <>
        <Grid item classes={{root:classes.icon}}>
            <img src={accounticon} alt="reset password page" />

        </Grid>
                <Fileds
                fileds={fileds}
                errors={errors}
                setvalues={setvalues}
                seterrors={seterrors}
                values={values}
                />
                 <Grid item>

                    <Button variant="contained" color="secondary"
                    classes={{root:classes.Reset}}
                    onClick={handleReset}
                    disabled={disabled}
                    >
                        {loading ? <CircularProgress/> :(
                            <Typography classes={{root:classes.buttontext}} variant='h5'>
                            Reset password
                         </Typography>
                       
                        )}
                         </Button>

                 </Grid>
            
            </>
        )
}