import React from "react"
import { useState } from 'react'
import clsx from 'clsx'
import { useStaticQuery,graphql } from "gatsby"
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { Button } from "@material-ui/core"
import Chip from "@material-ui/core/Chip"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import featureadadorment from "../../images/featured-adornment.svg"
import  frame from '../../images/product-frame-grid.svg'
import Reating from "./reating"
import explore from '../../images/explore.svg'
import { useMediaQuery } from "@material-ui/core";    

const usestyle=makeStyles(theme=>({
background:{
    backgroundImage:`url(${featureadadorment})`,
     backgroundPosition: 'top',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    width:'100%',
    height: '150rem',
    padding: '0 2.5rem',
    [theme.breakpoints.down('md')]:{
      height:'180rem',
      
     }
},
featured:{
height:'20rem',
width:'20rem',
[theme.breakpoints.down('md')]:{
      height:'15rem',
      width:'15rem',
     }

},
frame:{
   backgroundImage:`url(${frame})`,
     backgroundPosition: 'center',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    borderRadius:0,
    height:'24.8rem',
    width:'25rem' ,
    boxSizing:'border-box',
    boxShadow:theme.shadows[0],
    position:'absolute',
     zIndex:1,
     [theme.breakpoints.down('md')]:{
      height:'19.8rem',
      width:'20rem',
     }
},
slide:{
  backgroundColor:theme.palette.primary.main,
  height:'20rem',
  width:'24.5rem',
    transition:'transform 0.5s ease' ,
    zIndex:0,
    padding:'1rem 2rem' ,
    [theme.breakpoints.down('md')]:{
      height:'15.2rem',
      width:'19.5rem',
     }
},
slideright:{
  transform:'translate(24.5rem,0px)',

},
slideleft:{
  transform:'translate(-24.5rem,0px)',
},
slidedown:{
  transform:'translate(0,19.5rem)',
},
productcontainer:{
margin:'5rem 0',

},
eplorecontainer:{
  marginTop:'auto',
},
exploreimg:{
  marginRight:'1rem',
},
eplorebutton:{
textTransform:'none',
},
chiplabel:{
  ...theme.typography.h5,
},
chiproot:{
  backgroundColor:theme.palette.secondary.main
},


}))

export default function FeatuaredProduct(){
const classes=usestyle();
const matchesMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
const[selctedexpanded,setexSelectedpanded]=useState(null)

    const data=useStaticQuery(graphql`
    query GetFeatured {
  allStrapiProduct(filter: {featured: {eq: true}}) {
    edges {
      node {
        name
        strapiId
        variants {
          price
          images {
            url
          }
        }
      }
    }
  }
}
    `)
   
    return (

        <Grid container direction="column" justify={matchesMd ? "space-between" :'center'} classes={{root:classes.background}} alignItems='center'>
            {data.allStrapiProduct.edges.map(({node},i)=>
            {
              const alignment = matchesMd?'center':
              i===0||i===2?"flex-start"
              :i===1||i===3?'center'
              :'flex-end'
              return(
            <Grid container justify={alignment} key={node.strapiId} classes={{root:classes.productcontainer}}>
            <Grid item>
              <IconButton 
              onClick={()=>selctedexpanded===i ? setexSelectedpanded(null):setexSelectedpanded(i)}
               classes={{root:classes.frame}}>
                    <img src={process.env.GATSBY_STRAPI_URL+node.variants[0].images[0].url} alt={node.name}
                    className={classes.featured}
                    />
              </IconButton>
              <Grid container direction="column" classes={{root:clsx(classes.slide,{
                [classes.slideleft]: !matchesMd && selctedexpanded===i && alignment==='flex-end',
                 [classes.slideright]: !matchesMd && selctedexpanded===i &&
                 (  alignment==='flex-start'|| alignment==='center'),
                 [classes.slidedown]:matchesMd && selctedexpanded===i
              }) }}>
               <Grid item>
                <Typography variant="h4">
                  {node.name.split('-')[0]}
                </Typography>
               
               </Grid>
                   <Grid>
                      <Reating number={2.5} />
                      
                   </Grid>
                    <Grid>
                     
                      <Chip classes={{root:classes.chiproot,label:classes.chiplabel}} label={`$${node.variants[0].price}`}/>
                   </Grid>
                   <Grid item classes={{root:classes.eplorecontainer}}>
                    <Button
                    classes={{root:classes.eplorebutton}}>
                    <Typography classes={{root:classes.exploreimg}} variant="h4">
                      Details
                    </Typography>
                    <img  src={explore} alt='explore'/>
                    </Button>
                   </Grid>
              </Grid>
              
            </Grid>
            </Grid>
            )})}
        </Grid>
    )
}
