import * as React from "react"
import Layout from "../components/ui/layout"
import Grid from '@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles,useTheme } from "@material-ui/core/styles"
import clsx from 'clsx'
import { Button } from "@material-ui/core"
import address from '../images/address.svg'
import Phone   from  '../images/phone-adornment.svg'
import Email from '../images/Email-adorment'
import send    from  '../images/send.svg'
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import nameAdorment from '../images/name-adornment.svg'
import PhoneAdorment from '../images/phoneAdorment'
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useState } from 'react'
import Validate from "../components/ui/validate"
const usestyle =makeStyles(theme=>({
maincontainer:{
height: '45rem',
backgroundColor:theme.palette.primary.main,
marginBottom:'10rem',
[theme.breakpoints.down('md')]:{
  marginTop:'8rem',
  height:'90rem',
}
},
formwrapper:{
height:'100%' ,
[theme.breakpoints.down('md')]:{
  height:'50%',
  marginTop:'-8rem',
},
[theme.breakpoints.down('xs')]:{
  width:'100%',
},
},
formcontainer:{
   height:'100%',
},
titlecontainer:{
marginTop:'-4rem'
},
blockcontainer:{
backgroundColor:theme.palette.secondary.main,
height:'8rem',
width:'40rem',
display:'flex',
justifyContent:'center',
alignItems:'center',
[theme.breakpoints.down('sm')]:{
  width:'30rem',
},
[theme.breakpoints.down('xs')]:{
  width:'100%',
}
},
buttoncontainer:{
marginBottom:'-4rem',
textTransform:'none',
borderRadius:0,
"&:hover":{
backgroundColor:theme.palette.secondary.light
},

},

sendicon:{
marginLeft:'2rem',
},
contantinfo:{
    fontSize:'1.5rem',
    marginLeft:'1rem',
  
},
contacticon:{
    height:'3rem',
    width:'3rem',
    
  
},
contactemailicon:{
    height:'2.25rem',
    width:'3rem',
    
},
sendmessage:{
  [theme.breakpoints.down('xs')]:{
    fontSize:'2.5rem',
  },
},
infocontainer:{
  height:'18.5rem',

  [theme.breakpoints.down('xs')]:{
    height:'12.8rem'
  }
},
middleinfo:{ 
  borderTop:'solid 2px #fff',
  borderBottom: "solid 2px #fff",
 
},
iconcontainer:{
  borderRight:'solid 2px #fff',
  height:'6rem',
  width: '7rem',
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',

  [theme.breakpoints.down("xs")]: {
      height: "4rem",
      width: "5rem",
    
    },
  
},
filedcontainer:{
  marginBottom: '1rem',
},
filedcontainerrr:{
  border:'2px solid #fff',
  padding:'1rem',
  borderRadius:'1rem',
  marginTop:'1rem',
  
},
emailAdormernt:{
  height:17,
  width:22,
  marginBottom:10,
},
phoneadorment:{
  height:25.122 ,
  width:25.173,
},
buttondisabled:{
  backgroundColor:theme.palette.grey[500],
},
textfiled:{
  width:'30rem',
  [theme.breakpoints.down('sm')]:{
    width:'20rem',
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
}
}))
const ContactPage = () => {  
     const theme=useTheme()
     const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
       const matchesXs=useMediaQuery(theme=>theme.breakpoints.down('xs'))
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[phone,setphone]=useState('')
    const[message,setmessage]=useState('')
    const[errors,seterrors]=useState({})
        const classes=usestyle()
        
  return( 
    <Layout>
     <Grid container 
     justify='space-around' 
     alignItems="center"
     direction={matchesMd?'column' :'row'}
      classes={{root:classes.maincontainer}}>
        <Grid item classes={{root:classes.formwrapper}}>
            <Grid 
            classes={{root:classes.formcontainer}} 
            container 
            direction="column" 
            alignItems="center"
             justify="space-between"
             >


                <Grid  item classes={{root:clsx(classes.titlecontainer,classes.blockcontainer)}}>
              <Typography variant="h4">
                 contact us
            </Typography>
            </Grid>
            <Grid item>
              <Grid container direction='column'>
                <Grid item classes={{root:classes.filedcontainer}}>
                  <TextField  vlaue={name}
                   onChange={(e)=>{
                    if(errors.name){
                      const valid=Validate({name:e.target.value})
                      seterrors({...errors,name:!valid.name})
                    }
                    setname(e.target.value)
                  }}
                    placeholder='name'
                    onBlur={e=>{
                      const valid=Validate({name})
                      seterrors({...errors,name:!valid.name})
                    }}
                    error={errors.name}
                    helperText={errors.name && 'you must be enter a name'}

                    classes={{root:classes.textfiled}}
                    InputProps={{
                      startAdornment:(
                          <InputAdornment position='start'>
                            <img src={nameAdorment} alt='name'/>
                          </InputAdornment>
                    ),}}
                    />
              
                </Grid>

                <Grid item  classes={{root:classes.filedcontainer}}>
                  <TextField vlaue={email} 
                  onChange={(e)=>{
                     if(errors.email){
                      const valid=Validate({email:e.target.value})
                      seterrors({...errors,email:!valid.email})
                    }
                    
                    setemail(e.target.value)}}
                    placeholder='email'
                    onBlur={e=>{
                      const valid=Validate({email})
                      seterrors({...errors,email:!valid.email})
                    }}
                    error={errors.email}
                    helperText={errors.email && 'this is invalid email'}
                     classes={{root:classes.textfiled}}
                      InputProps={{
                      startAdornment:(
                          <InputAdornment position='start'>
                            <div className={classes.emailAdormernt}>
                              <Email color={theme.palette.secondary.main} />
                            </div>
                          
                          </InputAdornment>
                    ),}}
                     />
                </Grid>


                <Grid item  classes={{root:classes.filedcontainer}}>
                  <TextField  
                  vlaue={phone} 
                  onChange={(e)=>{
                     if(errors.phone){
                      const valid=Validate({phone:e.target.value})
                      seterrors({...errors,phone:!valid.name})
                    }
                    setphone(e.target.value)}} 
                   placeholder='phone' 

                    onBlur={e=>{
                      const valid=Validate({phone})
                      seterrors({...errors,phone:!valid.phone})
                    }}
                    error={errors.phone}
                    helperText={errors.phone && 'this is invalid phone'}
                   classes={{root:classes.textfiled}}
                   InputProps={{
                      startAdornment:(
                          <InputAdornment position='start'>
                          <div className={classes.phoneadorment}>
                            <PhoneAdorment color={theme.palette.secondary.main} />
                          </div>
                          </InputAdornment>
                    ),}}
                   />
                </Grid>



                <Grid item  classes={{root:classes.filedcontainerrr}}>
                  <TextField vlaue={message} 
                  onChange={(e)=>{
                     if(errors.message){
                      const valid=Validate({message:e.target.value})
                      seterrors({...errors,message:!valid.message})
                    }
                    setmessage(e.target.value)}} 
                   placeholder='messages' 
                    onBlur={e=>{
                      const valid=Validate({message})
                      seterrors({...errors,message:!valid.message})
                    }}
                    error={errors.message}
                    helperText={errors.message && 'this is invalid email'}
                   multiline rows={8} 
                   classes={{root:classes.textfiled}}/>
                </Grid>

              </Grid>
            </Grid>
            
            <Grid item 
            InputProps={{disableUnderline:true}}
             component={Button} 

             disabled={Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length !==4}
             classes={{root:clsx(classes.buttoncontainer,classes.blockcontainer,{
              [classes.buttondisabled]:Object.keys(errors).some(error=>errors[error]===true)||Object.keys(errors).length !==4
             })}}> 
              
                    <Typography variant="h4" classes={{root:classes.sendmessage}}>
                        Send message 
                    </Typography>
                    <img className={classes.sendicon} src={send} alt='send message'/>
                
            </Grid>
            
             </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" justify='space-between'  classes={{root:classes.infocontainer}}>
            <Grid item container alignItems="center" >
              <Grid item  classes={{root:classes.iconcontainer}} >
                <img className={classes.contacticon} src={address} alt="address" />
              </Grid>
              <Grid item>
                <Typography classes={{root:classes.contantinfo}} variant="h2">
                    30 s example st{matchesXs?<br/>:null}:witch kansas ,k5 6711
                </Typography>
              </Grid>

            </Grid>

            <Grid item container alignItems="center"classes={{root:classes.middleinfo}}>
              
              <Grid item classes={{root:classes.iconcontainer}} >
                <img className={classes.contacticon} src={Phone} alt="phone" />
              </Grid> 
              <Grid item>
                <Typography classes={{root:classes.contantinfo}} variant="h2">
                    (555) 555-5555
                </Typography>
              </Grid>
                
            </Grid>
            <Grid item container alignItems="center">
             

             <Grid item classes={{root:classes.iconcontainer}} >
              <div className={classes.contactemailicon}> 
                  <Email color='#fff'/>
              </div>
              
              </Grid>
              <Grid item>
                <Typography classes={{root:classes.contantinfo}} variant="h2">
                    kero @ var-x.com
                </Typography>
              </Grid>

                
            </Grid>
           
          </Grid>
        </Grid>
     </Grid>
    </Layout>
    )
}

export default ContactPage
