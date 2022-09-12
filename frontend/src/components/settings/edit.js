import React,{useContext,useState}from "react";
import Grid from'@material-ui/core/Grid'
import axios from "axios";
import{ CircularProgress} from "@material-ui/core";
import { IconButton  } from "@material-ui/core";
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import Backword from "../../images/Backward-outline"
import editIcon from "../../images/edit.svg"
import saveIcon from "../../images/save.svg"
import Settings from "./setting";
import { Feedbackcontext, FeedbackWrapper } from "../../context";
import { setsnackbar,setuser } from "../../context/actions"

const usestyle=makeStyles(theme=>({

icon:{
    height: "8rem",
    width:'8rem',
},
editcontainer:{
borderLeft:' 4px solid #fff ',
[theme.breakpoints.down('md')]:{
    height:'30rem',
    borderLeft:0
  },
},


}))

export default function Edit({
    setSelectedSetting,
    edit,
    setedit,
     detils,
    Location,
     detailslot,
    locationslot,
     changedmade,
    user,
    dispatchuser
}){

    const classes=usestyle()
    const {dispatchfeedback}=useContext(Feedbackcontext)
    const [loading,setloading]=useState(false)
   const handleedit=()=>{
    setedit(!edit)
    {/*if(edit && changedmade){
        setloading(true)
          const {password,...newdetails}=detils
          axios.post(process.env.GATSBY_STRAPI_URL+
            "/users-permissions/set-settings",
          {
            details: newdetails,
             detailsslot: detailslot,
            location:Location,
            locationslot:locationslot
          },{headers:{Authorization:`Bearer ${user.jwt}`}}
          ).then(response=>{
            setloading(false)
            dispatchfeedback(setsnackbar({status:"success",message:'settings saved  succeessfully '}))
            dispatchuser(setuser({...response.data,jwt: user.jwt,onboarding:true}))
          }).catch(error=>{
            setloading(false)
            console.error(error)
            dispatchfeedback(setsnackbar({status:'error',
            message:'there was a problem saving your settings , please try again  '}))
          })
            
    }*/}
   }
    return(
        <Grid item container 
        alignItems="center" justify="space-evenly"
        classes={{root:classes.editcontainer}} 
        
        lg={6} 
        xs={12}
        >
            <Grid item>
                <IconButton onClick={()=>setSelectedSetting(null)}>
                    <span className={classes.icon}>
                      <Backword color="#fff"/>
                    </span>
                  
                </IconButton>
                
            </Grid>
                 <Grid item>
        {loading ? <CircularProgress color="secondary" size="8rem"/>: (

             <IconButton disabled={loading} onClick={handleedit}>
                    <img src={edit ? saveIcon :  editIcon}
                     alt={` ${ edit ? 'save' : 'edit'} Settings`}
                     className={classes.icon}
                     />
                </IconButton>
                

                    )} 
                
            </Grid>
        </Grid>
    ) 
}