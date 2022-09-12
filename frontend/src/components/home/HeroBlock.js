import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
 import Lottie from 'react-lottie'
 import animationData from '../../images/data.json'
 import { useMediaQuery } from "@material-ui/core";    
import { makeStyles } from "@material-ui/core/styles"

const usestyle=makeStyles(theme=>({

    textcontainer:{
      padding:'2rem',
      [theme.breakpoints.down('xs')]:{
        padding:'1rem',
      },
    },
    heading:{
    [theme.breakpoints.down('xs')]:{
        fontSize: '3rem',
    }
    },


  
  }))
 export default function HeroBlock() {
    const classes=usestyle()
    const MediaMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const MediaLg=useMediaQuery(theme=>theme.breakpoints.down('lg'))
    const MediaXs=useMediaQuery(theme=>theme.breakpoints.down('xs'))
  const defaultOpition={
   loop:true,
   autoplay:false,
   animationData,
  }
  
return(
<Grid container justify="space-around" alignItems="center">

    <Grid item classes={{root:classes.textcontainer}}>
<Grid item container direction="column">
    <Grid item >
        <Typography variant='h1'  align="center"classes={{root:classes.heading}}>
            The premier
            <br/>
            Developers clothing line
        </Typography>
    </Grid>
    <Grid item>

        <Typography variant='h3'  align="center"  >
            High quality ,custom designed shirts ,Hats, hooides 
        </Typography>
    </Grid>


</Grid>
</Grid>

<Grid item>

<Lottie isStopped options={defaultOpition} width={MediaXs ? "20rem" : MediaMd ? '30rem': MediaLg ? '40rem': '50rem'}/>

</Grid>

</Grid>

)

 }