import React,{useContext} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import QtyButton from "../product-list.js/qtybutton"
import {Chip} from '@material-ui/core'
import FavoriteIcon from '../../images/Favorite'
import SubscriptionIcon from '../../images/Supscription'
import DeleteIcon from '../../images/Deleate'
import {IconButton} from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { removefromcart } from "../../context/actions";
import { CartContext } from "../../context";
const usestyle=makeStyles(theme=>({

productimage:{
   height: "10rem",
   width: "10rem",
},
name:{
    color:theme.palette.secondary.main,
},
id:{
color: theme.palette.secondary.main,
fontSize:'1rem',

},
actionwrapper:{
    height:'3rem' ,
    width: '3rem',
    marginBottom:-8,
},
infocontainer:{
    width: "35rem",
    height: '8rem',
    position: 'relative',
    marginLeft: "1rem",

},
chipwrapper:{
    position: 'absolute',
    top:'3.5rem',
},
itemcontainer:{
    margin: "2rem 0 2rem 2rem "
},
actionbutton:{
"&:hover":{
backgroundColor:" transparent",
},

},
}))

export default function Item({item}){
    
    const classes=usestyle()
    const theme = useTheme()
    const {dispatchcart}=useContext(CartContext)


    const handledelete =()=>{
        dispatchcart(removefromcart(item.variant,item.qty))
    }
    const acctions=[
        {icon:FavoriteIcon,color:theme.palette.secondary.main},
        {icon:SubscriptionIcon,color:theme.palette.secondary.main},
        {icon:DeleteIcon,color:theme.palette.error.main,size:'2.5rem',
        onClick:handledelete}
    ]
    return(
        <Grid item container classes={{root:classes.itemcontainer}} >
            <Grid item>
         <img
         className={classes.productimage}
         src={process.env.GATSBY_STRAPI_URL+item.variant.images[0].url}
                 alt="item.variant.id" />
                
            </Grid>
            <Grid
             item 
             container
              direction='column' 
              classes={{root:classes.infocontainer}}
              justify='space-between'
              >
                <Grid item container justify="space-between">
                    <Grid item>
                         <Typography variant="h5" classes={{root:classes.name}}>

                       {item.name} 
                    </Typography>
                    </Grid>
                   
            
                <Grid item>
                    <QtyButton
                     name={item.name} 
                     selectedvariant={0} 
                     variants={[item.variant]}
                     stock={[{qty:item.stock}]}
                     iscart
                     />
                   
                </Grid>
                 </Grid>
                 <Grid item classes={{root:classes.chipwrapper}} >
                    <Chip label={`$${item.variant.price}`}/>
                 </Grid>
                 <Grid item container justify='space-between' alignItems="flex-end">
                    <Grid item xs>
                        <Typography variant="body1" classes={{root:classes.id}}>
                            ID:{item.variant.id}
                        </Typography>
                    </Grid>
                    <Grid item container  justify='flex-end' xs>
                        {acctions.map((action,i)=> (
                            <Grid item key={i}>
                                <IconButton 
                              onClick={()=>action.onClick()}
                                disableRipple
                                classes={{root:classes.actionbutton}}>
                                    <span style={{
                                        height:action.size,
                                        width:action.size
                                        }} className={classes.actionwrapper}>
                                       <action.icon color={action.color}/>
                                    </span>
                                   
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                 </Grid>
            </Grid>
        </Grid>
    )
}