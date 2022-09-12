import React,{useEffect} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import checkmark from '../../images/checkmark-outline.svg'
import forward from '../../images/forward-outline.svg'
import { Button } from "@material-ui/core";
import { setuser } from "../../context/actions";

const usestyle=makeStyles(theme=>({

icontext:{
    marginTop:'10rem',
},
text:{
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textTransform:'none',
},
shop:{
    marginLeft:'1rem'

},
shopcontainer:{

},
shopcontainer:{
    marginRight:'1rem',
    marginBottom: "1rem",
},

}))

export default function Complete({dispatchuser,user}){
    const classes=usestyle()
    useEffect(()=>{
    return ()=>{
      dispatchuser(setuser({...user,onboarding:true}))
    }
    },[])
    return(
       <>
       <Grid item container alignItems="center" classes={{root:classes.icontext}} direction="column">

      
       <Grid item>
          <img src={checkmark} alt="check mark" />

         

       </Grid>
       <Grid item>
        <Typography  classes={{root:classes.text}} variant="h3">
            Account Created!
        </Typography>
       </Grid>
       
     </Grid>
     <Grid item   container justify='flex-end'>
        <Grid classes={{root:classes.shopcontainer}} item >
           <Button>
          <Typography classes={{root:classes.text}} variant="h3">
            shop
          </Typography >
              <img src={forward}
              className={classes.shop}
               alt="browse product" />
         </Button>

       </Grid>


        </Grid>
        
       </>
    )
}