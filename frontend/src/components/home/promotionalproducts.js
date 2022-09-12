import React from "react"
import Grid from'@material-ui/core/Grid'
import  Button  from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import clsx from 'clsx'
import Loadable from "@loadable/component"
import { useStaticQuery,graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import promoAdormant from '../../images/promo-adornment.svg'
import explore from '../../images/explore.svg'
import  Typography from '@material-ui/core/Typography'
import { useMediaQuery } from "@material-ui/core";    

import { useState } from 'react'

const usestyle=makeStyles(theme=>({
maincontainer:{
   backgroundImage:`url(${promoAdormant})`,
    backgroundPosition: 'top',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    width:'100%',
    height: '70rem',
    padding:'30rem 10rem 10rem 10rem',
    [theme.breakpoints.down('lg')]:{
      padding:'20rem 2rem 2rem 2rem' ,

    }

},
productname:{
color:'#fff' ,
},
iconbutton:{
"&:hover":{
backgroundColor: 'transparent'
},
},

carouselimage:{
  height:'30rem' ,
  width: '25rem',
  backgroundColor: '#fff',
  borderRadius:20,
  boxSizing:theme.shadows[5],
  [theme.breakpoints.down('md')]:{
    height: '25rem',
    with:'20rem',
  },
  [theme.breakpoints.down('xs')]:{
    height: '13rem',
    width:'13rem',
    overflow: 'hidden',
  },
 
},
carsoualcontainer:{
  marginLeft: '20rem',
  [theme.breakpoints.down('md')]:{
    margin: 0,
    height: '30rem',
  }
},
space:{
  margin: '0 15rem 10rem 15rem',
  [theme.breakpoints.down('sm')]:{
    margin: '0 5rem 10rem 5rem',
  },
  [theme.breakpoints.down('xs')]:{
    margin: '0 4rem 10rem 4rem',
  }
},
explore:{
 textTransform: 'none',
 marginRight: '2rem',
},
descriptioncontainer:{
  textAlign: 'right',
  [theme.breakpoints.down('md')]:{
    textAlign:'center',
  }
},

}))
const Carousel = Loadable(() => import("react-spring-3d-carousel"))
export default function PromotionalProduct(){
  const MatchMd=useMediaQuery(theme=>theme.breakpoints.down('md'))
    const[selectedslide,setselectedslide]=useState(0)
    const classes=usestyle();
   
    const data=useStaticQuery(graphql`
    
    query GetProm{
  allStrapiProduct(filter: {promo: {eq: true}}) {
    edges {
      node {
        name
        strapiId
        description
        variants {
          images {
            url
          }
        }
      }
    }
  }
}
`)
   
   var slides=[
   
  ]
   data.allStrapiProduct.edges.map(({node},i)=>slides.push(
    {

      key:i,
      content:(
        <Grid container direction="column" alignItems="center" >
           <Grid item>
            <IconButton 
            onClick={()=>setselectedslide(i)}
            classes={{root:
              clsx(classes.iconbutton,{
                [classes.space]:selectedslide!==i
              })}}>
              <img src={process.env.GATSBY_STRAPI_URL+
                node.variants[0].images[0].url} alt={`images-${i}`} 
                className={classes.carouselimage}
                />
            </IconButton>
           </Grid>
           <Grid item>
            {selectedslide===i?(
          
                <Typography variant="h1" classes={{root: classes.productname}}>
                  {node.name.split('-')[0]}
                </Typography>
                   
            ) : null}
           </Grid>
        </Grid>
      ),
      description:node.description,
    }
   ))
   
 
   
    return(
<Grid  container justify={ MatchMd ? 'space-around':"space-between"}
 alignItems="center"
  classes={{root:classes.maincontainer}}
  direction={MatchMd ? 'column': 'row'}
  >
    <Grid item classes={{root:classes.carsoualcontainer}}>
 <Carousel slides={slides} goToSlide={selectedslide}/>
           </Grid>
    <Grid item classes={{root:classes.descriptioncontainer}} >
      <Typography variant="h2" paragraph>
         {slides[selectedslide].description}
      </Typography>
      <Button>
        <Typography variant="h4" classes={{root:classes.explore}}>
          Explore
        </Typography>
        <img src={explore} alt="go to product page" />
      </Button>
    </Grid>
</Grid>
        
    )
}