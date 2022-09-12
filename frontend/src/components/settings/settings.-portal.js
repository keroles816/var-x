import React,{useContext,useState,useEffect} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import accountIcon from '../../images/account.svg'
import settignsIcon from '../../images/settings.svg'
import orderHistoryIcon from '../../images/order-history.svg'
import favoriteIcon from '../../images/favorite.svg'
import {useSpring, useSprings,animated}from "react-spring"
import subscriptionIcon from '../../images/subscription.svg'
import background from '../../images/repeating-smallest.svg'
import {Usercontext} from '../../context' 
import useResizeAware from 'react-resize-aware'
import { Button } from "@material-ui/core";
import{ useMediaQuery} from "@material-ui/core";
import Settings from "./setting"
import clsx from "clsx"
import { setuser } from "../../context/actions";
const usestyle=makeStyles(theme=>({

name:{
   color:theme.palette.secondary.main,

},

dashboard:{
   width:"100%", 
  minHeight:'30rem',
  height:"auto",
 
   backgroundImage:`url(${background})`,
   backgroundSize:"fill",
   backgroundPosition:"center",
   backgroundRepeat:"repeat",
   borderTop:({showcomponet})=>`${showcomponet ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
 borderBottom:({showcomponet})=>`${showcomponet ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
    margin:"5rem 0" ,
    [theme.breakpoints.down('md')]:{
      padding:({showcomponet})=>showcomponet ? 0 : "5rem 0",
      "& > :not(:last-child)":{
         marginBottom: ({showcomponet})=>showcomponet ? 0 : "5rem"
      }
    },
    [theme.breakpoints.down('xs')]:{
     padding:({showcomponet})=>showcomponet ? 0 : "2rem 0",
      "& > :not(:last-child)":{
         marginBottom: ({showcomponet})=>showcomponet ? 0 : "2rem"
      }
    },

},
icon:{
   height:"12rem" ,
   width:"12rem",
   [theme.breakpoints.down('lg')]:{
      height:'10rem',
      width:'10rem',
   },
},
button:{
   backgroundColor:theme.palette.primary.main,

},
addhover:{
   "&:hover":{
      cursor: 'pointer',
      backgroundColor:theme.palette.secondary.main
   },
},
logout:{
  
   color:theme.palette.error.main

},
}))

const AnimayedButton=animated(Button)

const AnimayedGrid=animated(Grid)
export default function Settingsportal(){
   
    const {user,dispatchuser,defaultuser} =useContext(Usercontext)

  const [selectedSetting , setSelectedSetting] = useState(null)
  const [resizerLisner,sizes]=useResizeAware()
  const[showcomponet,setshowcomponent]=useState(false)
    const classes=usestyle({showcomponet})
     
    const matcheslG=useMediaQuery(theme=>theme.breakpoints.down("lg"))
     const matcheslGMD=useMediaQuery(theme=>theme.breakpoints.down("md"))
       const matcheslGXS=useMediaQuery(theme=>theme.breakpoints.down("xs"))
    const buttonwidth= 
    matcheslGXS ? 
    `${sizes.width - 64}px`
      : matcheslGMD
      ? `${sizes.width - 160}px `
      : matcheslG 
      ? "288px"
      : "352px"
    const buttonheight= matcheslGMD ? "22rem": matcheslG ? "18rem" : "22rem"
    const buttons=[
      {label:'settings',icon:settignsIcon,compont:Settings},
      {label:'order History',icon:orderHistoryIcon},
      {label:'favorites',icon:favoriteIcon},
      {label:'subscription',icon:subscriptionIcon}]

                    const handleClick = setting => {
    if (selectedSetting === setting) {
      setSelectedSetting(null)
    } else {
      setSelectedSetting(setting)
    }
  }


       const springs=useSprings(buttons.length,buttons.map(button=>({
            to:async(next,cancel)=>{
               const scale={
                transform: selectedSetting===button.label ||
          selectedSetting === null ?
             "scale(1)":"scale(0)",
             delay:selectedSetting !== null ? 0  : 600
               }
               const size={
                  height:selectedSetting===button.label ? 
                matcheslGMD ? "120rem" :  "60rem": buttonheight,
                  width:selectedSetting===button.label ? `${sizes.width}px`:buttonwidth ,
                  borderRadius:selectedSetting===button.label ? 0 : 25,
                   delay:selectedSetting !== null ? 600  : 0
               }
               const hide={
                  display: selectedSetting === button.label || selectedSetting ===null ?
                  "flex":"none",
                  delay:150,

               }
               await next(selectedSetting !==null ? scale : size)
               await next(hide)
               await next(selectedSetting !==null ? size : scale)
            },
           
           


             })))
             const styles=useSpring(
               {opacity: selectedSetting===null || showcomponet ? 1 : 0,
                delay: selectedSetting === null || showcomponet ? 0 : 1350 })
                  
                  const handlelogout=()=>{
                     dispatchuser(setuser(defaultuser))
                  }

                useEffect(()=>{
                if(selectedSetting===null){
                setshowcomponent(false)
                  return 

                }
                const timer=setTimeout(() =>setshowcomponent(true),2000);
                return ()=>clearTimeout(timer)

                },[selectedSetting])
    return (
        <Grid container
         direction="column"
         alignItems="center"
         
         justify='center'
         >
            {resizerLisner}
            <Grid item>
            <img src={accountIcon} alt="settings page" />
                </Grid>
                 <Grid item>
                    <Typography 
                    variant="h4" 
                    classes={{root:classes.name}}
                     align="center"
                    >
                       Welcome back ,{user.username} 
                    </Typography>
                 </Grid>
                 <Grid item>
                  <Button onClick={handlelogout}>
                     <Typography variant="h5" classes={{root:classes.logout}}>
                        Logout
                     </Typography>
                  </Button>
                 </Grid>
              
                 <Grid 
                 item
                  container
                   classes={{root:classes.dashboard}}
                   alignItems='center'
                   justify='space-around'
                   direction={matcheslGMD ? "column" : "row" }
                   >
                   {springs.map((prop,i)=>{
                     
                     const button=buttons[i]
                     
                     return(
                   
                        <AnimayedGrid 
                        item
                        key={i}
                     
                        onClick={()=>showcomponet  ? null : handleClick(button.label)}
                        style={prop}
                        classes={{root:clsx(classes.button,{
                           [classes.addhover]:!showcomponet
                        })}}
                        >
                           <AnimayedGrid 
                           style={styles}
                           alignItems='center'
                           justify='center'
                           container direction="column">

                           {selectedSetting === button.label && showcomponet ?
                              <button.compont setSelectedSetting={setSelectedSetting}/> : (
                                    <>
                                     <Grid item>
                                 <img src={button.icon}
                                  alt={button.label} 
                                  className={classes.icon}
                                  />

                              </Grid>
                              <Grid item >
                                 <Typography variant="h5">
                                    {button.label}
                                 </Typography>
                              </Grid>
                                 </>
                              )}
                              
                           </AnimayedGrid>
                        </AnimayedGrid>
                   )})}

                 </Grid>
        </Grid>
    )
}