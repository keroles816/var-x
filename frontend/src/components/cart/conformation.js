import React,{useState} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import Fileds from "../auth/fileds";
import conformationicon from "../../images/tag.svg"
import Namesdornment from '../../images/nameadornment'
import EmailAdornment from '../../images/Email-adorment'
import Phoneadornment from '../../images/phoneAdorment'
import streatAdornment from '../../images/street-adornment.svg'
import zipadornment from '../../images/zip-adornment.svg'
import cardadornment from '../../images/card.svg'
import promoAdorment from '../../images/promo-code.svg'
import clsx from 'clsx'
import {Chip }from "@material-ui/core";
import { Button } from "@material-ui/core";
const usestyle=makeStyles(theme=>({

  nameWrapper:{
    height:22,
    width:22,

  },
 text:{
    fontSize:'1rem',
     color:"#fff"

 },
 emailWrapper:{
   height: 17,
   width:22,
 },
 phoneWrapper:{
    height: 25.122,
    width:25.173,
 },
card:{
  height:18,
    width:25,

},
pricelabel:{
  fontSize:'1.5rem',
},
darkbackgroud:{
  backgroundColor:theme.palette.secondary.main,

},
filedrow:{
  height:'2.5rem',
},
iconwrapper:{
  display:'flex' ,
  justifyContent:'center',
  alignItems:'center',
},
centertext:{
   display:'flex' ,

  alignItems:'center',
},
adornmentwrapper:{
   display:'flex' ,
  justifyContent:'center',
},
pricevalue:{
  marginRight:"1rem",
},
filedwrapper:{
  marginLeft:'1.25rem',
},
button:{
  width:"100%",
  height:"7rem",
  borderRadius:0,
  backgroundColor:theme.palette.secondary.main,
  "&:hover":{
    backgroundColor:theme.palette.secondary.light
  },
},
buttonwrapper:{
  marginTop:'auto',
},
maincontainer:{
  height:"100%",
},
chiproot:{
  backgroundColor:"#fff",

},
chiplabel:{
  color:theme.palette.secondary.main,
},
}))

export default function Conformation(){
    const classes=usestyle()
    const [promo,setpromo]=useState({ promo: ""})
    const [promoerror,setpromoerror]=useState({})
    const firstfileds=[{
        value :'keroles abdelmessih',adornment:(
       <div className={classes.nameWrapper}>

            <Namesdornment color="#fff"/>

           </div>
    )},
    
    {
        value :'abdelmessihgaber@gmail.com',
        adornment:(
       <div className={classes.emailWrapper}>

            <EmailAdornment color="#fff"/>

           </div>
    )},

 {
        value :"(555) 555-5555",
        adornment:(
       <div className={classes.phoneWrapper}>

            <Phoneadornment />

           </div>
    )},

       {
        value :"123 example st",
        adornment:(
    <img src={streatAdornment} alt="streat" />
           
    )},
]

 const secondfields=[

    {value :'witchita , ks 67211',adornment :(
     <img src={zipadornment} alt="zipadornment" />   
    )},

    {
        value:"**** **** **** 1234",
        adornment: <img src={cardadornment} className={classes.card} alt="cardadornment" />
    },
    
    {
        promo:{
           helperText:"",
          placeholder:"Promo code",
          startAdornment: <img src={promoAdorment}  alt="promoAdorment" />
        }
    }

  ]

    const prices=[
        {
           label:'SUBTOTAL',
           value: 99.99
        },
        {
            label:"SHIPPING",
            value:9.99
        },
        {
            label:"TAX",
            value:9.67,
        }
    ]


  const adornmentvalue=(adornment,value) =>(
    <>
    <Grid item xs={2} classes={{root:classes.adornmentwrapper}}>
           {adornment}
         </Grid>
           <Grid item xs={10} classes={{root:classes.centertext}}>
            <Typography variant="body1" classes={{root:classes.text}}>

             {value} 
            </Typography>
 
           </Grid>
    </>
  )  

    return(

  <Grid direction="column" item container classes={{root:classes.maincontainer}}>
      <Grid item container>
        <Grid item container direction="column" xs={7}>
            {firstfileds.map((filed,i)=>(
               <Grid   alignItems='center' item container key={filed.value} classes={{root: clsx(classes.filedrow,{
                [classes.darkbackgroud]: i % 2 !==0 
               })}}>
                   
                  {adornmentvalue(filed.adornment,filed.value)}


           </Grid>
                
            ))}
          
        </Grid>
        <Grid item xs={5} classes={{root:classes.iconwrapper}}>
           <img  src={conformationicon} alt="confirmation"/>
        </Grid>
      </Grid>
      {secondfields.map((filed,i) => (
        <Grid
         item
          container 
          key={i}
          alignItems='center'
            classes={{root: clsx(classes.filedrow,{
                [classes.darkbackgroud]: i % 2 !==0 
               })}}>
           <Grid item container xs={7}>
            {filed.promo ? (
              <span className={classes.filedwrapper}>
              <Fileds 
              fileds={filed}
              values={promo}
              setvalues={setpromo}
              errors={promoerror}
              seterrors={setpromoerror}
              iswhite
          

              /> 
                 </span>
            ):(
          
               adornmentvalue(filed.adornment,filed.value)

            )}


           </Grid>
           
           <Grid item container xs={5}>
              <Grid item xs={6}>
               <Typography variant='h5' classes={{root:classes.pricelabel}}>

               {prices[i].label}

               </Typography>
              </Grid>
              <Grid item xs={6}>
                 <Typography
                  align="right"
                   variant="body2"
                   classes={{root:classes.pricevalue}}
                   >
                     
                  {`$${prices[i].value}`}

                 </Typography>
                

              </Grid>

           </Grid>
        </Grid>
      ))}
      <Grid item classes={{root:classes.buttonwrapper}}>
        <Button classes={{root:classes.button}}>
         <Grid justify='space-around' alignItems="center" container>
               <Grid item >
                <Typography variant="h5">
                  PLACE ORDER
                </Typography>
               </Grid>
                 <Grid item>

                  <Chip classes={{root:classes.chiproot,
                    label:classes.chiplabel}} label="$149.99">

                  </Chip>
                 </Grid>

         </Grid>
        </Button>
      </Grid>
    </Grid>

    )
    
    
}