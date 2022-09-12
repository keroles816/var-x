import React,{useState} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import CheckoutNavagation from "./checkoutnavagstion";
import Details from "../settings/details"
import Location from "../settings/location";
import Shipping from "./shipping";
import Payments from "../settings/paynment"
import Conformation from "./conformation";
import Validate from "../ui/validate";
const usestyle=makeStyles(theme=>({
stepcontainer:{
    width:'40rem',
    height:'25rem',
    backgroundColor:theme.palette.primary.main
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



}))

export default function Checkoutportol({user}){
    const classes=usestyle()
    const [billingslot,setbillingslot]=useState(0)
    const [detailsvalues,setdetailvalues]=useState({
        name:"",email:"",phone:""
    })
    const [detailslot,setdetailslot]=useState(0)
     const[detailBilling ,setdetailBilling]=useState(false)
    const [selectedstep,setselectedstep]=useState(0)
    const [savecard,setsavecard]=useState(false)

    const [Locationvalues,setlocationvalues]=useState({street:"",zip:"",
    city:"",state:""
})
const [locationslot,setlocationslot]=useState(0)
const [locationBilling,setlocationBilling]=useState(false)
const [selectedshipping,setselectedshipping]=useState(null)
const shippingoptions=[
    {label:'FREE SHIPPING', price:0},
     {label:"2-DAY SHIPPING", price:9.99},
     {label: "OVERNIGHT SHIPPING", price:29.99}
    ]
    const errorhelper=values=>{
     const valid =Validate(values)
     return Object.keys(valid).some(value => !valid[value] )
      

    }
    const steps = [
        {title:'contact Info',
        component:( 
        <Details 
        user={user}
        values={detailsvalues} 
        setvalues={setdetailvalues} 
        slot={detailslot}
         setslot={setdetailslot}
         Billing={detailBilling} 
         setBilling={setdetailBilling}
         checkout

          /> 
          
          ),
          error : errorhelper(detailsvalues)
        },
         {title:'Address' ,
         component:(<Location 
         user={user}
          values={Locationvalues} 
         setvalues={setlocationvalues}  
         slot={locationslot} 
         setslot={setlocationslot}
         billing={locationBilling}
         setbilling={setlocationBilling}
          checkout

         />
         ),
         error : errorhelper(Locationvalues),
        
        },
          {title:'Shipping',component:
          (<Shipping 
          shippingoptions={shippingoptions}
          selectedshipping={selectedshipping}
          setselectedshipping={setselectedshipping}
          
          />
          ),
          error: selectedshipping ===null
        
        },
           {title:'payment',component: (<Payments
           user={user}
           checkout
           slot={billingslot}
           setslot={setbillingslot}
         savecard={savecard}
           setsavecard={setsavecard}
           />),
           error:false
          },
            {title:'confirmation',component:<Conformation/>},
             {title:`Thanks, ${user.username}!`},
     
    
    ]
    return (
        <Grid item container alignItems="flex-end" direction="column" xs={6}>
          <CheckoutNavagation 
          setselectedstep={setselectedstep}
          steps={steps} 
          selectedstep={selectedstep}/>

          <Grid
           item 
           container 
           classes={{root:classes.stepcontainer}}
            alignItems="center"
             direction="column"
             >

            {steps[selectedstep].component}


          </Grid>
        </Grid>
    )
}