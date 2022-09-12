import React,{useState} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import cardIcon from "../../images/card.svg"
import Slot from "./slots";
import {FormControlLabel} from "@material-ui/core";
import {Switch} from "@material-ui/core";

const usestyle=makeStyles(theme=>({

number:{
    color:'#fff',
    marginBottom:'5rem',

},
removecard:{ 
   backgroundColor:'#fff' ,
   padding: "0 5",
   "&:hover":{
    backgroundColor:'#fff'
   },
   marginLeft: "2rem",

},
removecardText:{
fontSize:'1rem',
color:theme.palette.primary.main,
fontFamily:'Philosopher',
fontStyle:'italic',

},
icon:{
    marginBottom:'3rem',
    [theme.breakpoints.down('xs')]:{
        marginBottom:'1rem',
    },
},
paymentcontainer:{
    borderLeft:({checkout})=> (checkout ? 0 :'4px solid #fff'),
    position: 'relative',

    [theme.breakpoints.down('md')]:{
    height:'30rem',
    borderLeft:0,
  },

},
slotcontainer:{
    position: 'absolute',
    bottom:0 ,
},
switchWrapper:{
    marginRight: 4,
  },
  switchlabel:{
    color:'#fff',
    fontWeight: 600,

  },
}))

export default function Payments({
    user,
    slot,
    setslot,
    checkout,
    setsavecard,
    savecard
}){
    const classes=usestyle({checkout})
  
    const card=user.paynmentmethod[slot]
    
    return (
        <Grid item container 
        direction="column"
        lg={checkout ? 12 : 6} 
        xs={12}
         alignItems='center' 
         justify='center' 
         classes={{root:classes.paymentcontainer}}>
        <Grid item>
          <img src={cardIcon} alt="paynment settings" className={classes.icon}/>

        </Grid>
        <Grid item container justify='center'>
            <Grid item>
                <Typography align='center' variant='h3' classes={{root:classes.number}}>
                    {card.last4
                    ?`${card[0].brand.toUpperCase()} **** **** **** ${card[0].last4}`: 
                    "Add A new card During Check out "}
                </Typography>
            </Grid>
           {card.last4 && (
             <Grid item >
                <Button variant="contained" classes={{root:classes.removecard}}>
                <Typography variant="h6" classes={{root:classes.removecardText}}>

                      remove Card
                </Typography>
                </Button>
            </Grid>
           )}
        </Grid>
        <Grid item container justify="space-between" classes={{root:classes.slotcontainer}}>
            <Slot slot={slot} setslot={setslot} nolabel/>

             {checkout && (
                  <Grid item>
                    <FormControlLabel 
                    classes={{root:classes.switchWrapper, 
                      label:classes.switchlabel }}
                    label="save card for future use"
                    labelPlacement="start"
                    control={ 
                    <Switch 
                    checked={savecard}
                    onChange={ ()=>setsavecard(!savecard)}
                    color= "secondary"
                    />
                    }/>

                  </Grid>
                )}
        </Grid>
        
      </Grid>
    )
}