import React,{useState,useEffect} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import favorite from '../../images/favorite.svg'
import subscription from '../../images/subscription.svg'
import clsx from 'clsx'
import Rating from '../home/reating'
import { Button, Chip } from "@material-ui/core"
import Sizes from '../product-list.js/sizes'
import Swatches from '../product-list.js/swatches'
import QtyButton from '../product-list.js/qtybutton'
import {colorIndex} from "../product-list.js/productframegrid"
import { useMediaQuery } from "@material-ui/core"
const usestyle=makeStyles(theme=>({
background:{ 
    backgroundColor:theme.palette.secondary.main,
    height:'45rem',
    width:'33rem' ,
    [theme.breakpoints.down('md')]:{
        width: '100%',
    },
    [theme.breakpoints.down('xs')]:{
        height:'58rem',

    },
},

center:{
 backgroundColor:theme.palette.primary.main,
 height:'35rem',
 width:'45rem',
 position:'absolute', 
 [theme.breakpoints.down('lg')]:{
    width:'40rem',
 },
 [theme.breakpoints.down('md')]:{
        width: '100%',
    },
    [theme.breakpoints.down('xs')]:{
        height:'48rem',
        
    },
},
icon:{
    height:'4rem' ,
    width:'4rem' ,
    margin:'0.5rem 1rem',
},
sectioncontainer:{
height: 'calc(100%/3)'

},
descriptioncontainer:{
    backgroundColor:theme.palette.secondary.main,
    overflowY:'auto',
    padding:'0.5rem 1rem',
},
name:{
    color:'#fff',
},
reviewbutton:{
    textTransform:'none',
},
detailscontainer:{
padding: '0.5rem 1rem'

},
chipcontainer:{
   marginTop:'1rem',
    [theme.breakpoints.down('xs')]:{
        marginTop:0,
        marginBottom: '1rem',
    },
},
chiproot:{
  height:'3rem',
  width:'8rem',
  borderRadius:50,
},
chiplabel:{
   fontSize:'2rem', 
},
stock:{
    color:'#fff',
},
sizesAndswatchs:{
    maxWidth: '15rem',
},
container:{
    padding:'0 1rem',
},
"@global":{
    ".MuiButtonGroup-groupedOutlinedVertical:not(:first-child)":{
        marginTop:0,
    },
},
}))
 export const getStockDisplay=( stock ,variant)=>{
    switch(stock){
        case undefined:
            case null:
               return "Loading Inventory..."
                break
                case -1:
                    return "Error Loading Inventory"
                    break 
                    default :
                    if(stock[variant].qty===0){
                        return "Out of Stock"
                    }else{
   return `${stock[variant].qty} Currently In Stock`     
                    }

                break

    }
 }
export default function Productinfo({
    name,
    description,
     variants,
     selectedvariant,
       setselectedvariant,
       stock
}){
    const classes=usestyle()
    const[selectedsize,setselectedsize]=useState(variants[selectedvariant].size)
    const [selectedcolor,setselectedcolor]=useState(null)
    const matchesXs=useMediaQuery(theme=>theme.breakpoints.down('xs'))

    const Imageindex=
    colorIndex({node:{variants}},selectedcolor)
    const sizes=[]
    const colors=[]

    variants.map(variant=>{
        sizes.push(variant.size)

        if(!colors.includes(variant.color) && variant.size === selectedsize ){
            colors.push(variant.color)
        }
    })
   useEffect(()=>{
    setselectedcolor(null)
     const newvariant=variants.find(variant=>variant.size===selectedsize && variant.color === colors[0])
     setselectedvariant(variants.indexOf(newvariant))

   },[selectedsize])
    useEffect(()=>{

        if(Imageindex !== -1){
              setselectedvariant(Imageindex)
        }
    },[Imageindex])

  const stockDisplay=getStockDisplay(stock,selectedvariant)

    
    return(
        <Grid item justify='center' 
        alignItems="flex-end" container direction="column"
        lg={6}>
          <Grid 
          classes={{root:classes.background}}
           item 
           container
             justify='flex-end'
            
            >
           <Grid item>
            <img className={classes.icon} src={favorite} alt="favorite" />
           </Grid>
            <Grid item>
            <img className={classes.icon} src={subscription} alt="make subscription" />
           </Grid>
          </Grid>

         <Grid 
         classes={{root:classes.center}}
          item 
          container 
          direction="column">

            <Grid 
            item 
            container
            justify='space-between'
            direction={matchesXs ? 'column' :'row'}
             classes={{root:clsx( classes.detailscontainer, classes.sectioncontainer)}}>
              <Grid item>
                <Grid container direction='column'>
                    <Grid item >
                        <Typography classes={{root:classes.name}} variant="h1">
                            {name.split("-")[0]}
                         </Typography>
                    </Grid>
                    <Grid item >
                        <Rating number={4.5}/>
                    </Grid>
                    <Grid item>
                     <Button>
                        <Typography classes={{root:classes.reviewbutton}} variant="body2">
                        Leave A Review 
                        </Typography>
                     </Button>
                    </Grid>
                </Grid>
                </Grid>  


               <Grid item classes={{root:classes.chipcontainer}} >
                <Chip  classes={{root:classes.chiproot,label:classes.chiplabel}} label={`$${variants[selectedvariant].price}`}/>
               </Grid>

            </Grid>
            <Grid 
            item 
            container
             classes={{root:clsx(classes.sectioncontainer,classes.descriptioncontainer)}}>
              <Grid item>
                <Typography variant="h5">Description</Typography>
                <Typography variant="body2">{description}</Typography>
              </Grid>
             </Grid>

            <Grid 
            item 
            container
            justify={matchesXs ? "space-around" : "space-between"}
            alignItems={matchesXs ? 'flex-start':  "center"}
            direction={matchesXs ? 'column' :'row'}
             classes={{root:clsx(classes.sectioncontainer,classes.container)}}>
            
                <Grid item>
                    <Grid container  direction='column'>
                        <Grid item classes={{root:classes.sizesAndswatchs}}>
                            <Sizes 
                            sizes={sizes} 
                            selectedsize={selectedsize}
                              setselectedsize={setselectedsize}/>
                     <Swatches 
                     colors={colors} 
                     selectectedcolor={selectedcolor}
                    setselectedcolor={setselectedcolor} />
                        </Grid>
                     
                     <Grid item>
                        <Typography classes={{root:classes.stock}} variant="h3">
                        {stockDisplay}   
                        </Typography>
                     </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <QtyButton  
                    stock={stock} 
                    selectedvariant={selectedvariant}
                    name={name}
                    variants={variants}

            
                    />
                       
                </Grid>
                
             </Grid>
          </Grid>
        </Grid>
    )
}