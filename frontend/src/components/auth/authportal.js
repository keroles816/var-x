import React ,{useState,useContext,useEffect}from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import Login from "./Login";
import Signup from "./signup"
import Reset from "./reset"
import Complete from "./complete"
import { Usercontext,Feedbackcontext } from "../../context"
const usestyle=makeStyles(theme=>({

paper:{
    border:`2rem solid ${theme.palette.secondary.main}`,
    width: '50rem',
    height:'40rem',
    borderRadius:0,
    [theme.breakpoints.down('md')]:{
     width: '30rem'
    },
    [theme.breakpoints.down('xs')]:{
      width:"calc(100vw - 2rem)",
      borderWidth: "1rem"
    },
},
inner:{

    height:'40rem',
    width:'100%',
    border:`2rem solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('xs')]:{
      
      borderWidth: "1rem"
    },

},
container:{
    marginBottom:'8rem',
    [theme.breakpoints.down('md')]:{
      marginTop: '5rem',
    },
},
"@global":{

  ".MuiInput-underline:before, MuiInput-underline:hover:not(.Mui-disabled):before":{
    borderBottom:`2px solid ${theme.palette.secondary.main}`
  },
  ".MuiInput-underline:after":{
    borderBottom:`2px solid ${theme.palette.secondary.main}`
  },
  
},


}))

export default function Authportal(){
    const [selecyedstep,setselectedstep]=useState(0)
    const {user,dispatchuser}=useContext(Usercontext)
   const {feedback,dispatchfeedback}=useContext(Feedbackcontext)
    const steps=[
        {compont:Login, label:"Login"},
         {compont:Signup , label:"Sign Up"},
          {compont:Complete,label:'complete'},
             {compont:Reset,label:'Reset'}]

             useEffect(()=>{
              const prams=new URLSearchParams(window.location.search)
              const code=prams.get("code")
              if(code){
                const ressetstep=steps.find(step=>step.label==="Reset")
                setselectedstep(steps.indexOf(ressetstep))
              }
             },[])
    const classes=usestyle()
    return(
        <Grid container justify='center' classes={{root:classes.container}}>
            <Grid item >
             <Paper elevation={6} classes={{root:classes.paper}}>
              <Grid container direction="column"
               alignItems="center"
               justify='space-between'
               classes={{root:classes.inner}}
               >
                {steps.map((Step,i)=>(
                  
               selecyedstep===i ?<Step.compont
                 setSelectedStep={setselectedstep}
                 user={user}
                 feedback={feedback}
                 dispatchfeedback={dispatchfeedback}
        
                 dispatchuser={dispatchuser}
                  steps={steps}
                  key={steps.label}
                  /> : null
                ))}
                
                </Grid>  
             </Paper>
            </Grid>
        </Grid>
    )
}