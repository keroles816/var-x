import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import  Button  from "@material-ui/core/Button"
import  ButtonGroup  from "@material-ui/core/ButtonGroup"
import { useState } from 'react'
import background  from '../../images/repeating-smallest.svg'
import ListIcon from "../../images/List"
import GriIcon from "../../images/Grid"
import clsx from 'clsx'
import { useMediaQuery } from "@material-ui/core";
const usestyles=makeStyles(theme=>({

description:{
color:'#fff'
},
DescriptionContainer:{
    backgroundColor:theme.palette.primary.main,
    height:'15rem',
    width:'60%',
    borderRadius: 25,
    padding: '1rem',
    [theme.breakpoints.down('md')]:{
      width:'100%' ,

    },
    [theme.breakpoints.down('sm')]:{
     borderRadius:0,
    },
},
maincontainer:{
    padding:'3rem',
    backgroundImage:`url(${background})`,
    backgroundSize:'fill',
    backgroundPosition:'center',
    backgroundRepeat:'repeat',
    position:'relative',
    [theme.breakpoints.down('sm')]:{
      padding:'3rem 0',
    },

},
button:{
border:`2px solid ${theme.palette.primary.main} `,
borderRightColor:`${theme.palette.primary.main} !important`,
borderRadius:25,
backgroundColor:'#fff',
padding: '0.5rem  1.5rem',
"&:hover":{
        backgroundColor:"#fff"
    },
},
selected:{
    backgroundColor:theme.palette.primary.main,
    "&:hover":{
        backgroundColor:theme.palette.primary.light
    },
},
buttonGroup:{
position:'absolute',

right:0,
bottom:0,
marginRight:'3rem',
marginBottom:'3rem',
[theme.breakpoints.down('md')]:{
  position: 'relative',
  display: "flex",
  alignSelf: 'flex-end',
  marginRight:'0',
marginBottom:'0',
marginTop: '3rem',

},
[theme.breakpoints.down('sm')]:{
marginRight:'1.5rem'

}
},


}))

export default function DescriptionContainer({name,
  descrption,layout
  ,setlayout,

}){
const classes=usestyles()
const matchesmd=useMediaQuery((theme)=>theme.breakpoints.down('md'))
const changeLayout=(option)=>{
 
  setlayout(option)
}
return(

    <Grid item
     container 
     direction={ matchesmd? 'column':'row'}
     classes={{root:classes.maincontainer}}
     justify='center'
     alignItems={ matchesmd? 'center': undefined}
     >
    <Grid item classes={{root:classes.DescriptionContainer}}>
        <Typography align="center" variant="h4">
            {name}
        </Typography>
        <Typography  align="center"  classes={{root:classes.description}} variant="body1">
          {descrption}
        </Typography>
    </Grid>
    <Grid item classes={{root:classes.buttonGroup}}>
      <ButtonGroup>
        <Button
        onClick={()=>changeLayout('list')}
        classes={{outlined:clsx(classes.button,{
            [classes.selected]:layout==='list'
        })}}> 
          <ListIcon  color={layout==='list'? "#fff" :undefined}/>
        </Button>
        <Button 
         onClick={()=>changeLayout('grid')}
        classes={{outlined:clsx(classes.button,
            {
          [classes.selected]:layout==='grid'

            }
            )}}>
           <GriIcon color={layout==='grid'? "#fff" :undefined} />
        </Button>
      </ButtonGroup>
    </Grid>

    </Grid>
)

}