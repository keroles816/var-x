import React from'react'
import Grid from'@material-ui/core/Grid'
import Typography from'@material-ui/core/Typography'
import{makeStyles}from'@material-ui/core/styles'
import{Link}from'gatsby'
import  IconButton  from '@material-ui/core/IconButton'

import facebook from '../images/facebook.svg'
import twitter from'../images/twitter.svg'
import instagram from'../images/instagram.svg'



const useStyles=makeStyles(theme=>({

    Footer:{
        backgroundColor:theme.palette.primary.main,
        padding:'2rem' ,
    },
    spacer:{
        marginBottom:'2rem',
        marginTop:'2rem',
    },
   linkcontainer:{
  [theme.breakpoints.down('md')]:{
  marginBottom: '3rem',
  },
    },
    Link:{
        color:'#fff' ,
        fontSize:'1,2rem',
    },
    
    linkcoloum:{
        width:"20rem"
    },
    icon:{
        "&:hover":{
            backgroundColor:'transparent'
        }
    },
   " @global":{
        body:{
            margin: 0,
            
        },
        a:{
            textDecoration: "none",
        }
    }


}))

export default function Footer(){
const classes=useStyles()

const socialmedia=[
    {icon:facebook,alt:'facebook',link:"https://facebook.com"},
    {icon:twitter,alt:'twitter',link:'https://twitter.com'},
    {icon:instagram,alt:"instgram",link:'https://instagram.com'}
]

const Routes={
"contact us":[{label:'(555) 555-5555',href:'tel:(555) 555-5555'},{label:"kero@var_x",href:'kero@var_x'}],
"customer service":[{label:"contact us",link:'/contact'},{label:'my account',link:'/account'}],
"information":[{label:'privacy policy',link:'/privacy policy' },{label:'terms and condition',link:'/terms-condition'}],
}
return(
<footer className={classes.Footer}>
    <Grid container justifyContent='space-between'>
        <Grid item>
     <Grid  container classes={{root:classes.linkcontainer}}>
         
        {Object.keys(Routes).map(route=>(

            <Grid key={route} item container direction='column' classes={{root:classes.linkcoloum}}>
           <Grid item  >
               <Typography variant='h5'>{route}</Typography>
           </Grid>

          {Routes[route].map(catgor=>(

             <Grid item  key={catgor.label}>
 <Typography 
component={catgor.link ? Link :'a'} 
 to={ catgor.link ? catgor.link  : undefined}
 href={catgor.href ? catgor.href :undefined}
  variant='body1'classes={{body1:classes.Link}}>
    {catgor.label}
    </Typography>
           </Grid>


          ))}
          
         </Grid>
        ))}
        
  
     </Grid>
     </Grid>
      <Grid item >
     <Grid  container direction='column' alignItems='center'>
         {socialmedia.map(social=>(
         <Grid item key={social.alt}>

            <IconButton classes={{root:classes.icon}} compont='a' href={social.link} >
                <img src={social.icon} alt={social.alt} />
            </IconButton>
         </Grid>
         ))}
     </Grid>

   </Grid>
    </Grid>
  </footer>

)


}