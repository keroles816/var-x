import React,{useState} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import  Dialog  from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import frame from '../../images/selected-frame.svg'
import Reating from "../home/reating"
import  Button  from "@material-ui/core/Button"
import  Chip  from "@material-ui/core/Chip"
import explore from '../../images/explore.svg'
import Sizes from "./sizes"
import Swatches from "./swatches"
import QtyButton from "./qtybutton"
import { Link } from "gatsby"
import { getStockDisplay } from "../product-detail/products-info"

const usestyle=makeStyles(theme=>({

selectedframe:{
backgroundImage:`url(${frame})`,
backgroundPosition:'center',
backgroundRepeat:"no-repeat",
height:"60.4rem ",
width:'73.5rem', 
padding: "0 !important",
},
dialog:{
    maxWidth:"100%",
},
productImage:{
height:"40rem",
width:"40rem",
marginTop:'5rem',

},
toolbar:{
 backgroundColor:theme.palette.primary.main ,
 height:"13rem", 
 marginTop:'2rem',
 padding: "0.5rem 1rem",
 position:'relative',
},
stock:{
    color:'#fff',
},
detail:{
    color:'#fff',
    textTransform:"none",
    fontSize:'1.5rem',
},
exploreicon:{
    height:"1.5rem",
    width: '2rem',
    marginLeft: "0.5rem"
},
detailbutton:{
    padding:0,
},
infocontainer:{
height:"100%" ,
textDecoration:'none',

},
chiproot:{
  transform:'scale(1.5)',
},
chipcontainer:{
  display :"flex" ,
  alignItems:'center',

},
qtycontauiner:{
  marginTop: '2.25rem',
},
infoitem:{
position:'absolute',
left:'1rem' ,
height:'calc(100%-1rem)',
},
actionitem:{
position:'absolute',
right:'1rem',
},


}))

export default function QuickView({
  open
  ,setopen,
  imageurl,
  name,
  price,
  product,
  sizes,
  colors,
  selectedsize,
  setselectedsize,
  selectectedcolor,
  setselectedcolor,
  variant,
  stock,
  imageIndex,

}){
  const classes=usestyle()
  const selectedvariant=imageIndex ===-1 ?product.node.variants.
  indexOf(variant)
  :imageIndex
  const stockDisplay=getStockDisplay(stock,selectedvariant)
    return(
    <Dialog 
    classes={{paper:classes.dialog}}
     open={open} 
     onClose={()=>setopen(false)}>
        <DialogContent classes={{root:classes.selectedframe}}>
           <Grid container direction="column" alignItems="center">
            <Grid item>
                <img src={imageurl} alt="product image" 
                className={classes.productImage}/>
            </Grid>
            <Grid item 
            container 
            justify="center" 
            classes={{root:classes.toolbar}} >
              <Grid classes={{root:classes.infoitem}} item>
                <Grid container 
                direction="column"
                 justify='space-between' 
                 classes={{root:classes.infocontainer}} 
                 component={Link} 
              to={`/${product.node.catgory.name.toLowerCase()}/${product.node.name
                  .split("-")[0]
                  .toLowerCase()}`}

                 >
                  <Grid item>
                    <Typography variant="h4">
                        {name}
                    </Typography>
                    <Reating number={4}/>
                  </Grid>
                   <Grid item>
                    <Typography 
                    variant="h3" 
                    classes={{root:classes.stock}}>
                    {stockDisplay}
                    </Typography>
                    <Button classes={{root:classes.detailbutton}}>
                        <Typography 
                        variant="h3" 
                        classes={{root:classes.detail}}>
                            Details
                        </Typography>
                        <img src={explore}
                         className={classes.exploreicon} 
                         alt="explore" />
                    </Button>
                   </Grid>
                </Grid>
              </Grid>
              <Grid item
               classes={{root:classes.chipcontainer}}>
                <Chip 
                label={`$ ${price}`} 
                classes={{root:classes.chiproot}}/>
              </Grid>
              <Grid classes={{root:classes.actionitem}}  item>
                <Grid container direction="column">
                   
                    <Sizes sizes={sizes} selectedsize={selectedsize}
                    setselectedsize={setselectedsize}
                    />
                    <Swatches selectectedcolor={selectectedcolor}
                    setselectedcolor={setselectedcolor}
                    colors={colors} />
                    <span className={classes.qtycontauiner}>

                       <QtyButton 
                        name={name}
                       stock={stock}
                      selectedvariant={selectedvariant}
                        variants={product.node.variants}
                        />
                    </span>
                   
                </Grid>
              </Grid>
            </Grid>
           </Grid>
        </DialogContent>
    </Dialog>
    )
}