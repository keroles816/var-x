import React,{ useState,useEffect}from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import CircularProgress from "@material-ui/core/CircularProgress"
import { Button,TextField,IconButton ,InputAdornment } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import axios from 'axios'
import Valdite from '../../components/ui/validate'
import accouticon from '../../images/account.svg'
import EmailAdornment from '../../images/Email-adorment'
import Passwordadornment from '../../images/Passwordadornment'
import Hidepassword from '../../images/Hidepassword'
import Showpassword from '../../images/Showpassword'
import adduserIcon from '../../images/add-user.svg'
import forgotpasswordIcon from '../../images/forgot.svg'
import clsx from 'clsx'
import close from '../../images/close.svg'
import { setuser } from "../../context/actions"
import { setsnackbar } from "../../context/actions"
import Fileds from "./fileds"
const usestyle=makeStyles(theme=>({

EmailAdornment:{
height:17,
width:22,
marginBottom:10,
},
accounticon:{
    marginTop:'2rem',
},



login:{
   width:'20rem',
   borderRadius:50,
   textTransform:'none',
    [theme.breakpoints.down('xs')]:{
      width:"15rem",
    },
},
facebooktext:{  
fontSize:'1.5rem',
fontWeight:600,
textTransform:'none'
},
facebookbutton:{
  marginTop:'-1rem',

},

passworderror:{
    marginTop:0
},
close:{
  paddingTop: 5 ,
},
reset:{
    marginTop:'-4rem',
    
},
visibleicon:{
padding:0 ,

},
buttontext:{
     [theme.breakpoints.down('xs')]:{
      fontSize:"1.25rem",
    },
},


}))
export const EmailPassword=(classes,hideEmail,hidepassword,
   visible, 
   setvisible,
   iswhite
   
   )=>(

{
        email:{
            helperText:"invalid email",
            placeholder:"Email",
            type:'text',
            hidden:hideEmail,
            startAdornment:(
                <span className={classes.EmailAdornment}>
                  <EmailAdornment color={iswhite ? '#fff' : null}/>
                </span>
            ),
        },
        password:{
           helperText:"your password must be at least 8 charachters and one uppercase letter, one numbe and one special charachter",
            placeholder:'password',
            type:visible ? "text" : 'password',
            hidden:hidepassword,
            startAdornment:<Passwordadornment color={iswhite ? '#fff' : null}/>,
              endAdornment:(
        <IconButton
            classes={{root:classes.visibleicon}}
            onClick={()=>setvisible(!visible)}>
             {visible ? <Showpassword color={iswhite ? '#fff' : null}/>
             :<Hidepassword color={iswhite ? '#fff' : null}/>}

             </IconButton>


              ),
        },
     }
)
export default function Login({steps,
    setSelectedStep,
    user,
    dispatchuser,
   
   dispatchfeedback,
}){
     const classes=usestyle()
    const [values,setvalues]=useState({
        email:"",
        password:""
    })
    const[errors,seterrors]=useState({})
      const [visible,setvisible]=useState(false)
      const [forgot,setForgot]=useState(false)
      const [loading,setloading]=useState(false)
     const fileds=EmailPassword(classes,false,forgot,visible,setvisible)
     const [success,setsuccess]=useState(false)
    

   
const navigateSignup=()=>{
const signupIndex=steps.find(step => step.label === "Sign Up")

    setSelectedStep(steps.indexOf(signupIndex))
}
const handleLogin=()=>{
    setloading(true)
    axios
    .post(process.env.GATSBY_STRAPI_URL + "/auth/local",{
        identifier:values.email,
        password:values.password,
    }).then(response=>{

      dispatchuser(setuser({...response.data.user,jwt:response.data.jwt,
   onboarding:true }))
     setloading(false)
    }).catch(error => {
        const {message}=error.response.data.message[0].messages[0]
        console.error(error)
         setloading(false)
         dispatchfeedback(
            setsnackbar({
            status:"error",
            message,
         }))
      })
}

const handleforgot=()=>{

      setloading(true)
    axios
    .post(process.env.GATSBY_STRAPI_URL + "/auth/forgot-password",{
        email:values.email
    }).then(response=>{
        setloading(false)
        
        setsuccess(true)

       
 dispatchfeedback(setsnackbar({status:"success",message:"Resetcode sent"}))

        
    }).catch(error=>{
          const {message}=error.response.data.message[0].messages[0]
        console.error(error)
         setloading(false)
         dispatchfeedback(
            setsnackbar({
            status:"error",
            message,
         }))

    })
}

const disabled=Object.keys(errors).some(error=>errors[error]===true)
     ||Object.keys(errors).length!==Object.keys(values).length

     useEffect(()=>{
      if(!success) return

      const timer = setTimeout(()=>{
            setForgot(false)
        },6000)
        
          return ()=> clearTimeout(timer)
     },[success])
    return(
        <>
        <Grid item classes={{ root: classes.accounticon }}>
        <img src={accouticon} alt="login page" />
      </Grid>
         
       <Fileds 
       fileds={fileds}
       errors={errors}
       seterrors={seterrors}
       values={values}
       setvalues={setvalues}
       />


        <Grid item>
            <Button variant="contained"
            disabled={loading || !forgot &&  disabled}
           onClick={ ()=> forgot ? handleforgot() : handleLogin()}
            classes={{root:clsx(classes.login,{
                [classes.reset]:forgot
            })}}
            color="secondary">


                {loading ? <CircularProgress/>:(

                  <Typography classes={{root:classes.buttontext}} variant="h5">
                   {forgot ? "forgot Password" : "Login"}
                </Typography>

                )}
                
            </Button>
        </Grid>
        {forgot ? null :(

 <Grid item>
            <Button classes={{root:classes.facebookbutton}}>
                <Typography classes={{root:clsx(classes.facebooktext,{
                    [classes.passworderror]:errors.password
                })}} 
                variant='h3'>
                  Login with facebook
                </Typography>
            </Button>
        </Grid>


        )}
       
         <Grid item container justify="space-between">
             <Grid item>
                <IconButton onClick={navigateSignup}>
                    <img src={adduserIcon} alt="sign up" />

                </IconButton>
             </Grid>
             <Grid item classes={{root:clsx({
                [classes.close]:forgot
             }

             )}}>
                <IconButton onClick={ ()=> setForgot(!forgot)} >
                   <img src={forgot? close  : forgotpasswordIcon  }
                    alt={ forgot ? "back to Login":"forgot password"} />
                </IconButton>
             </Grid>
         </Grid>
        </>
    )
}