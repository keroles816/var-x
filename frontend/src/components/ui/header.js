import React from 'react'
import { useState,useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import  Toolbar  from '@material-ui/core/Toolbar'
import  Typography from '@material-ui/core/Typography'
import  Button  from '@material-ui/core/Button'
import  Tabs  from '@material-ui/core/Tabs'
import  Tab  from '@material-ui/core/Tab'
import { Badge } from '@material-ui/core'
import  SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import  IconButton  from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import {Link,navigate} from 'gatsby'
import { CartContext } from '../../context'

 import menu from '../../images/menu.svg'
// import theme from './theme'

import search from '../../images/search.svg'
import cartIcon from '../../images/cart.svg'
import account from '../../images/account-header.svg'

const useStyles=makeStyles(theme=>({

  badge:{
    fontSize:'1rem',
    color:'#fff',
    backgroundColor:theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]:{
      fontSize:'0.75rem',
      height:'1.1rem',
      width:'1.1rem',
      minWidth: 0,
    }
  },
  coloredIndicator:{
    backgroundColor:'gren',
  },
  tap:{
  ...theme.typography.body1,
  fontWeight:500,
  },
  Tabs:{
marginLeft:'auto',
marginRight:'auto',

  },
  headline:{
    [theme.breakpoints.down('sm')]:{
      fontSize: '2.5rem',
     
    },
  },
  logoContainer:{
   [theme.breakpoints.down('md')]:{
     marginRight:'auto',
    
   },

  },
  icon:{
   height:'3rem',
    width:'3rem' ,
    [theme.breakpoints.down('sm')]:{
      height:'2rem',
      width:'2rem',
    },
    
  },
  drawer:{
   backgroundColor:theme.palette.primary.main,
  },
  ListItem:{
    color:'#fff'
  },



}))
export default function Header({catagories}){
  const [DrawerOpen ,setDrawerOpen]=useState(false)
  const classes=useStyles()
  const {cart}=useContext(CartContext)
  const matchesmd=useMediaQuery((theme)=>theme.breakpoints.down('md'))
  

  const iOS =process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const activeIndex = () => { 
    const pathname =
      typeof window !== "undefined"
        ? window.location.pathname.split("/")[1]
        : null

  const found = Routes.indexOf( Routes.filter( ({ node: { name, link } }) =>
   (link || `/${name.toLowerCase()}`) === `/${pathname}` )[0]
  )
 return found === -1 ? false : found 
}

  const Routes=[...catagories,{node:{name:'contact us',strapiId:'contact',link:'/contact'}}]


  const Taps=( <Tabs 
  value={activeIndex()} 
  classes={{indicator:classes.coloredIndicator, root:classes.Tabs}}>
          {Routes.map((route)=>(
           <Tab classes={{root:classes.tap}}
            component={Link} to={route.node.link  || `/${route.node.name.toLowerCase()}`}  label={route.node.name} key={route.node.strapiId} />
          ))}
          
          
        </Tabs>
        )


     const drawer=(
 <SwipeableDrawer  open={DrawerOpen}
  onOpen={()=>setDrawerOpen(true)} 
  onClose={()=>setDrawerOpen(false)}
   disableBackdropTransition={!iOS} 
    disableDiscovery={iOS}
    classes={{paper:classes.drawer}}
    >
    <List disablePadding>
    {Routes.map((route,i)=>(
       <ListItem  
       divider 
       selected={activeIndex()===i}
       button  component={Link}
                to={route.node.link || `/${route.node.name.toLowerCase()}`}  key={route.node.strapiId}>
        <ListItemText  classes={{primary:classes.ListItem}} primary={route.node.name}/>
      </ListItem>
    ))}
    </List>
 </SwipeableDrawer>

 )

  const actions=[
    {icon:search,alt:'search ',visible:true,onClick:()=>console.log("search")}
  ,{icon:cartIcon,alt:'cart' ,visible:true,link:'/cart',}
  ,{icon:account,alt:'account', visible:!matchesmd,link:'/account', },
  {icon:menu,alt:'menu', visible:matchesmd ,onClick:()=>setDrawerOpen(true) ,}
]
  return(
    <AppBar color='transparent' elevation={0} position='static'>
      <Toolbar disableGutters>
        <Button  component={Link} to='/' classes={{root:classes.logoContainer}}>
          <Typography classes={{root:classes.headline}}  variant='h1'>var x</Typography>
        </Button>
        {matchesmd ? drawer : Taps}


         {actions.map((action=>{
           if(action.visible){
             return(
               <IconButton onClick={action.onClick} key={action.alt}
               component={action.onClick? undefined: Link}
                to={action.onClick ? undefined:action.link} >

                  {action.alt=== "cart" ? (
                    <Badge classes={{badge:classes.badge}}
                     overlap='circle'
                     badgeContent={cart.length}
                     >
                       <img 
                       className={classes.icon} 
                        src={action.icon}
                         alt={action.alt}  
                         />

                    </Badge>
                  ):(

                    <img 
                       className={classes.icon} 
                        src={action.icon}
                         alt={action.alt}
                         />

                  )}
                  
        
            </IconButton>
             )
            
           }



             }))}
       
         

      

                
          
        
      </Toolbar>
    </AppBar>
  )
}


