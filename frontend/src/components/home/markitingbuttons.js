import React from "react"
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { Button, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"

import markitingadorment from '../../images/marketing-adornment.svg'
import morebyus  from '../../images/more-by-us.svg'
import store  from '../../images/store.svg'
  
const usestyle=makeStyles(theme=>({
buttoncontainer:{
    backgroundImage:`url(${markitingadorment})`,
     backgroundPosition: 'center',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    height: '50rem',
    width:'50rem',
    textDecoration:'none',
    transition:' transform 0.5s ease',
    '&:hover':{
    transform: 'scale(1.1)',
    },
    [theme.breakpoints.down('lg')]:{
      height:'40rem' ,
      width:'40rem',
      margin:'3rem',
    },
    [theme.breakpoints.down('sm')]:{
      height:'30rem' ,
      width:'30rem',
      
    },
    
    [theme.breakpoints.down('xs')]:{
      height:'20rem' ,
      width:'20rem',
      margin:'2rem 0',
      
    },
},

container:{
  margin:'10rem 0'
},

label:{
      [theme.breakpoints.down('sm')]:{
      fontSize:'2.75rem',
    },
    [theme.breakpoints.down('xs')]:{
      fontSize:'2rem',
    },
    },

icon:{
    [theme.breakpoints.down('sm')]:{
      height:'8rem',
      width:'8rem',
    },
    
    },

}))
export default function Marktingbuttons(){
const classes=usestyle()
 const product= [
    {label:'Store',icon:store,link:'/hoodies'},{label:'More by us',icon:morebyus,link:'/shirts'}]
return(
<Grid container justify='space-around' classes={{root:classes.container}}>
    {product.map(button=>(
        <Grid item key={button.label}>
            <Grid container 
            direction="column" 
            classes={{root:classes.buttoncontainer}}
            justify='center'
            alignItems="center"
            component={button.link? Link :'a'}
            to={button.link?button.link:undefined}
            href={button.href?button.href:undefined}
            >
              <Grid item >
                <img className={classes.icon} src={button.icon} alt={button.label}/>

              </Grid>
              <Grid item>
                <Typography classes={{root:classes.label}} variant="h1">
                    {button.label}
                
                </Typography>
              </Grid>
            </Grid>
        </Grid>
    ))}
</Grid>
)
}