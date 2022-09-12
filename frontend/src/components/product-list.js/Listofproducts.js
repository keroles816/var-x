import React,{useState,useEffect} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import { useMediaQuery } from "@material-ui/core"
import ProductframeGrid from "./productframegrid" 
import ProductFramelist from "./productframelist"
import {useQuery}from '@apollo/client'
import {GET_DETAILS} from '../../apollo/query'
const usestyles=makeStyles(theme=>({
productcontainer:{
width:'95%',
[theme.breakpoints.only("xl")]:{
    "&>*":{
   marginRight:({layout})=>layout==='grid'?
    "calc(  (  100% - (25rem  * 4) ) /3)": 0 ,  
   marginBottom: "5rem",
},
"& > :nth-child(4n)":{
   marginRight:0, 
},

},
[theme.breakpoints.down("sm")]:{


   "& > *":{
   marginBottom:'5rem',
   }
},



[theme.breakpoints.only("lg")]:{
    "&>*":{
   marginRight:({layout})=>layout==='grid'?
    "calc(  (  100% - (25rem  * 3) ) /2)": 0 ,  
   marginBottom: "5rem",
},
"& > :nth-child(3n)":{
   marginRight:0, 
},

},


[theme.breakpoints.only("md")]:{
    "&>*":{
   marginRight:({layout})=>layout==='grid'?
    "calc(  (  100% - (25rem  * 2)))": 0 ,  
   marginBottom: "5rem",
},
"& > :nth-child(2n)":{
   marginRight:0, 
},

},


},



}))
export default function Listofproducts({
   products,
    layout,
    productsperpage,
    page,
   filteroptions,
    content,
}){
   
   const Framehelper=({Frame,product,variant})=>{
   
    const[selectedsize,setselectedsize]=useState(null)
    const[selectectedcolor,setselectedcolor]=useState()
     const [stock,setstock]=useState(null)
        const [selectedvariant,setselectedvariant]=useState(null)
        const{loading,error,data}=useQuery(GET_DETAILS,{
            variables: {id : product.node.strapiId}
          })
          useEffect(()=>{
             if(error){
              setstock(-1)
             }else if(data){
              setstock(data.product.variants)
             }
          },[error,data])

     useEffect(()=>{
      if(selectedsize === null) return undefined
    setselectedcolor(null)
     const newvariant=
    product.node.variants.find(item=>item.size===selectedsize
       && item.color === colors[0])
     setselectedvariant(newvariant)

   },[selectedsize])
    var sizes=[]
    var colors=[]
    product.node.variants.map(variant=>{
       
        sizes.push(variant.size)

        if(!colors.includes(variant.color)
        && variant.size === (selectedsize || variant.size) ){
           colors.push(variant.color)
        }
          
        
         
    })
 
   
   return <Frame sizes={sizes}
    variant={ selectedvariant ||variant }
     product={product}
     colors={colors}
     selectedsize={selectedsize || variant.size}
     setselectedsize={setselectedsize}
     selectectedcolor={selectectedcolor}
     setselectedcolor={setselectedcolor}
     stock={stock}
    
     />
   }
    const classes=usestyles({layout})
    const matchesSM=useMediaQuery(theme=>theme.breakpoints.down('sm'))
   
    return(

    <Grid 
    item
     container 
    alignItems={matchesSM ? 'center' : undefined} 
    direction={matchesSM ? 'column': 'row'} 
    
     classes={{root:classes.productcontainer}}>


        {content.slice( (page-1) * productsperpage
         ,page * productsperpage).map(item=>(
           <Framehelper
           Frame={layout==='grid' ? ProductframeGrid:ProductFramelist}
           key={item.variant.id}
            variant={item.variant}
           product={products[item.product]}

           />
          
        ))}
    </Grid>
    )
}