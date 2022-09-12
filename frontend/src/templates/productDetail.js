import React,{useState,useEffect} from "react"
import Grid from '@material-ui/core/Grid'
import {useQuery}from '@apollo/client'
import Layout from '../components/ui/layout'
import ProductImages from "../components/product-detail/product-images"
import Productinfo from "../components/product-detail/products-info"
import RecentlyViewed from "../components/product-detail/recentlyviewed"
import { useMediaQuery } from "@material-ui/core"
import {GET_DETAILS}from '../apollo/query'


export default function ProductList({pageContext :{name,id ,category
    ,description,product, variants}}){
        const[selectedvariant,setselectedvariant]=useState(0)
        const[selectedImage,setselectedImage]=useState(0)
        const[stock,setstock]=useState(null)
        
          const{loading,error,data}=useQuery(GET_DETAILS,{
            variables: {id}
          })
          useEffect(()=>{
             if(error){
              setstock(-1)
             }else if(data){
              setstock(data.product.variants)
             }
          },[error,data])
           
          const matchesMd =useMediaQuery(theme=>theme.breakpoints.down('md'))
        useEffect( () =>{
         

            var recentlyviewed=JSON.parse(window.localStorage.getItem('recentlyviewed'))
            if(recentlyviewed){
              if(recentlyviewed.length===10){
                recentlyviewed.shift()
              }
              if(!recentlyviewed.some(product=>product.node.name===name)){
                
              recentlyviewed.push(product)
              }
            }else{
              recentlyviewed=[product]
            }
            window.localStorage.setItem("recentlyviewed",JSON.stringify(recentlyviewed))




           
        },[])
return( 
<Layout>
    <Grid container direction="column">
         <Grid item container direction={matchesMd? 'column' : 'row' }>
         <ProductImages 
         images={variants[selectedvariant].images}
         selectedImage={selectedImage} 
         setselectedImage={setselectedImage}/>

         <Productinfo name={name} 
         variants={variants}
         selectedvariant={selectedvariant}
         setselectedvariant={setselectedvariant}
         description={description} 
         stock={stock}
         />
    </Grid>
    <RecentlyViewed products={JSON.parse(window.localStorage.getItem('recentlyviewed'))}/>
    </Grid>
    
   </Layout>
   )

}