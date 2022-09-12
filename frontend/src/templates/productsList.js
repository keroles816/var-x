import React,{useState,useRef,useEffect} from "react"
import Layout from "../components/ui/layout"
import Grid from'@material-ui/core/Grid'
import DynamicToolbar from "../components/product-list.js/dynamictoolbar"
import { graphql } from "gatsby"
import Listofproducts from "../components/product-list.js/Listofproducts"
import { Fab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"

import { alphbetic, time , price } from "../components/product-list.js/sort-function"
const usestyle=makeStyles(theme=>({

fab:{
alignSelf:'flex-end',
marginRight:'2rem',
marginBottom:'2rem',
color:'#fff',
fontFamily:'Montserrat',
fontSize:'5rem',
width:'5rem',
height:'5rem',

},

"@global":{
  '.MuiPaginationItem-root':{
    fontFamily:'Montserrat',
    fontSize:'2rem',
    color:theme.palette.primary.main,
    "&.Mui-selected":{
    color:'#fff',
    }
  }
}

}))

export default function ProductList(
  {pageContext:{filteroptions : options ,name,description},

data:{allStrapiProduct:{ edges:products}},
}){
  const classes=usestyle()
 const [layout,setlayout]=useState('grid')
 const[page,setpage]=useState(1)
 const scrollRef=useRef(null)
 const[filteroptions,setfilteroption]=useState(options)
 const[ sortoptions,setsortoptions]=useState([

{label:'A-Z' , active:true, function: data=>alphbetic(data,'asc')},
 {label:'Z-A', active:false,function: data=>alphbetic(data,'desc')}, 
 {label:'NEWEST', active:false,function: data=>time(data,'asc')},
 {label: 'OLDEST', active:false,function: data=>time(data,'desc')}, 
 {label:'PRICE ↑', active:false,function: data=>price(data,'asc')},
 {label:' PRICE ↓', active:false,function: data=>price(data,'desc')},
 {label: 'REVIEWS', active:false,function: data=> data},
 ])
 const scroll=()=>{
  scrollRef.current.scrollIntoView({behavior:'smooth'})
 }

 

useEffect(()=>{

setpage(1)

},[filteroptions,layout])  

 const productsperpage =layout==='grid'? 10 : 6

 

 var content=[]
 const selectedsort=sortoptions.filter(option=>option.active)[0]
const sortedproducts=selectedsort.function(products)

    sortedproducts.map((product,i)=>product.node.variants.map(variant=>
        
    content.push({product:i,variant})))

    var isFiltered=false
    var filters={}
    var filterproducts=[]
     
        Object.keys(filteroptions).filter(option=>filteroptions[option]
   !== null).map(option=>{
      filteroptions[option].forEach(value=>{
        if(value.checked){
            isFiltered=true
               if(filters[option]===undefined){

                  filters[option]=[]
               }
               if(!filters[option].includes(value)){

                   filters[option].push(value)

               }
               content.forEach(item=>{
                  if(option === 'color'){
                     if(item.variant.colorLabel === value.label &&
                        !filterproducts.includes(item)){

                        filterproducts.push(item)
                     }
                  }else if (item.variant[option.toLowerCase()]===value.label && 
                  
                  !filterproducts.includes(item)){

                      filterproducts.push(item)


                  }
               })

               }
            }) 
         })
      Object.keys(filters).forEach(filter=>{
         filterproducts=filterproducts.filter(item=>{
            let valid


            filters[filter].some(value=>{
             if(filter === 'color'){
             if(item.variant.colorLabel===value.label){

               valid=item
             }
             }else if(item.variant[filter.toLowerCase()]===value.label){
             valid = item


             }


            })
            return valid
         })
      })
     if(isFiltered){
      content=filterproducts
     }



 const numpages=Math.ceil(content.length/productsperpage)
return (

<Layout>
<Grid item container direction="column" alignItems="center">
      <div ref={scrollRef}/>
      <DynamicToolbar 
      filteroptions={filteroptions}
      setfilteroption={setfilteroption}
      sortoptions={sortoptions}
      setsortoptions={setsortoptions}
      name={name}
       description={description}
       layout={layout}
       setlayout={setlayout}
       
      />
      <Listofproducts
       page={page}
       productsperpage={productsperpage}
       layout={layout}
        products={products}
        content={content}
       filteroptions={filteroptions}
       />
      <Pagination
       page={page}
       onChange={(e,newpage)=>setpage(newpage)}
       count={numpages}
       color='primary' 
       classes={{root:classes.Pagination}}
       />
      <Fab onClick={scroll} color='primary' classes={{root:classes.fab}}>^</Fab>
        
    </Grid>
</Layout>
)
}

export const query=graphql`

query Getcatgoryproducts($id: String!) {
  allStrapiProduct(filter: {catgory: {id: {eq: $id}}}) {
    edges {
      node {
        strapiId
       createdAt
        name
        catgory{
          name
        }
        variants {
          color
          id
          price
          size
          style
          colorLabel
       
          images {
            url
          }
        }
      }
    }
  }
}
`