import React,{ useContext,useState}from "react";
import clsx from 'clsx'
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import Edit from "./edit";
import Details from "./details"
import Payments from "./paynment"
import Location from "./location";
import { Usercontext } from "../../context"
const usestyle=makeStyles(theme=>({
bottomRow:{
    borderTop:'4px solid #fff',
},
    sectioncontainer:{
        height:'50%' ,
    },

}))

export default function Settings({setSelectedSetting}){
     const classes=usestyle()
     const[changedmade,setchagemade]=useState(false)
   const {user,dispatchuser} =useContext(Usercontext)
   const[edit,setedit]=useState(false)
   const [billingslot,setbillingslot]=useState(0)
      const [detailvalues,setdetailvalues]=useState({
      name:'',
      phone:'',
      email:"",
    password:'********',
    
  })
   const [detailslot,setdetailslot]=useState(0)

  const [locationvalues,setlocationvalues]=useState({
    street:'',
    zip:'',
    city:"",
    state:""
})
 const[locationslot,setlocationslot]=useState(0)
    return (
        <>
        <Grid container classes={{root:classes.sectioncontainer}}>
            <Details 
            user={user}
             edit={edit} 
              setchagemade={setchagemade}
              values={detailvalues}
              setvalues={setdetailvalues}
              slot={detailslot}
              setslot={setdetailslot}
              />
            <Payments user={user}
             edit={edit} 
              setchagemade={setchagemade}
              slot={billingslot}
              setslot={setbillingslot}
              />
             </Grid>
             <Grid container classes={{root:clsx(classes.bottomRow,
                classes.sectioncontainer)}}>
                <Location 
                user={user}
                 edit={edit} 
                 setchagemade={setchagemade}
                 values={locationvalues}
                 setvalues={setlocationvalues}
                 slot={locationslot}
                 setslot={setlocationslot}
                /> 
                <Edit 
                edit={edit}
                 setedit={setedit}
                 dispatchuser={dispatchuser}
                  user={user}
                   setSelectedSetting={setSelectedSetting}
                   changedmade={changedmade}
                   detils={detailvalues}
                   Location={locationvalues}
                   detailslot={detailslot}
                   locationslot={locationslot}
                   />
             </Grid> 
       </>
    )
    
}