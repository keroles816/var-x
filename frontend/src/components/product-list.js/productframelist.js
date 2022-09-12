import React from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import frame from '../../images/product-frame-list.svg'
import Reating from "../home/reating"
import { Chip } from "@material-ui/core"
import Sizes from "./sizes"
import Swatches from "./swatches"
import QtyButton from "./qtybutton"
import { colorIndex } from "./productframegrid"
import {Link} from 'gatsby'
import { getStockDisplay } from "../product-detail/products-info"
const usestyle=makeStyles(theme=>({
frame:{
backgroundImage:`url(${frame})`,
backgroundPosition: 'center',
backgroundSize:"cover",
backgroundRepeat: "no-repeat",
height:"28rem",
},

info:{
   backgroundColor:theme.palette.primary.main,
   height: '100%',
   width :"100%" ,
   padding:'1rem',
   textDecoration:'none',
   [theme.breakpoints.down('md')]:{
    height:"50%",
   },

   [theme.breakpoints.down('sm')]:{
    height:"28rem",
   }

},
productimage:{
    height:'20rem',
    width:'20rem',
},
stock:{
 color:'#fff'   
},
sizesSwatches:{
    maxWidth:'15rem',
},
chiplabel:{
    fontSize:"2rem",
    "&:hover":{
     cursor: 'pointer',
    }
},
link:{
    textDecoration:'none',
},

}))

export default function ProductFramelist({
product,
variant,
 sizes,
  colors,
  selectedsize,
  setselectedsize,
  selectectedcolor,
  setselectedcolor,
   stock,

}){
    const classes=usestyle()
    const imageIndex=colorIndex(product,selectectedcolor)
    const images=imageIndex!==-1 ?
     product.node.variants[imageIndex].images:variant.images
   
     const selectedvariant=imageIndex === -1?
     product.node.variants.indexOf(variant):imageIndex
     const stockDisplay =getStockDisplay(stock,selectedvariant)
    return(
        <Grid item container>
            <Grid lg={9} 
            item container
            alignItems="center"
            justify='space-around'
             classes={{root:classes.frame}}>

             {images.map(image=>(
              <Grid item key={image.url} component={Link} 
               to={`/${product.node.catgory.name.toLowerCase()}/${product.node.name
                  .split("-")[0]
                  .toLowerCase()}`}>
                <img src={process.env.GATSBY_STRAPI_URL+image.url} 
                alt="go to image"
                    className={classes.productimage}
                    />
                    
              </Grid>  
             ))}
            </Grid>
            <Grid item 
            container 
            direction='column' 
            lg={3}
            justify='space-between'
            classes={{root:classes.info}}>
               
                    <Grid classes={{root:classes.link}} container direction='column'
                     component={Link} 
              to={`/${product.node.catgory.name.toLowerCase()}/${
        product.node.name.split("-")[0].toLowerCase()
      }`}
                    >
                        <Grid item>
            <Typography variant="h4">
                {product.node.name.split("-")[0]}
            </Typography>
           </Grid>
           <Grid item>
            <Reating number={3.5}/>
           </Grid>
           <Grid item>
        <Chip classes={{label:classes.chiplabel}} label={`$${variant.price}`}/>
           </Grid>
           <Grid item>
            <Typography variant="h3" classes={{root:classes.stock}}>
                {stockDisplay}
            </Typography>
           </Grid>
                    </Grid>

              <Grid classes={{root:classes.sizesSwatches}} item container direction="column">
                
         <Sizes sizes={sizes}
          setselectedsize={setselectedsize}
           selectedsize={selectedsize}/>

         <Swatches colors={colors} 
         setselectedcolor={setselectedcolor}
         selectectedcolor={selectectedcolor}/>

              </Grid>
         
             <QtyButton
              stock={stock} 
             selectedvariant={selectedvariant}
             name={product.node.name.split("-")[0]}
               variants={product.node.variants}
             
             />
 
        
            </Grid>
        </Grid>
        
    )
}