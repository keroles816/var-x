import React,{useState,useEffect,useContext} from "react";
import Grid from'@material-ui/core/Grid'
import  Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import  Button  from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import  Badge from "@material-ui/core/Badge"
import Cart from '../../images/cart'
import clsx from 'clsx'
import { CartContext } from "../../context";
import { addtocart,removefromcart } from "../../context/actions";
const usestyle=makeStyles(theme=>({

qtytext:{
    color:({iscart})=>iscart ? theme.palette.secondary.main :'#fff'
},
maingroup:{
    height:'3rem',
},

editbutton:{
height:"1.525rem",
borderRadius:0,
backgroundColor:({iscart})=>iscart ? "#fff" : theme.palette.secondary.main,
borderLeft:({iscart})=>  ` 2px solid 
${iscart ? theme.palette.secondary.main : '#fff' }`,

borderRight:'2px solid #fff',
borderTop:'none',
borderBottom:'none',
},
endbutton:{
    borderRadius:50,
    backgroundColor: ({iscart})=>iscart ? '#fff': theme.palette.secondary.main,
    border:'none',
},
cartButton:{
    marginLeft:'0 !important',
    transition: "background-color 1s ease"
},
minusbutton:{
 borderTop:({iscart})=> ` 2px solid 
${iscart ? theme.palette.secondary.main : '#fff' }`,
},
minus:{
   marginTop:'-0.25rem', 
},
QtyButton:{
    "&:hover":{
 backgroundColor: ({iscart})=>iscart ? '#fff': theme.palette.secondary.main,
    },
   
    },


     badgebutton:{  
     color:"#fff",
     fontSize: "1.5rem",
     backgroundColor:theme.palette.secondary.main,
     padding: 0,

     },
   success:{
    backgroundColor:theme.palette.success.main,
    "&:hover":{
         backgroundColor:theme.palette.success.main,
    },
   }

}))  

export default function QtyButton({
    stock,
    selectedvariant,
    variants,
    name,
    iscart,
}){
    const classes=usestyle({iscart})
    
    const {cart,dispatchcart}=useContext(CartContext)

     const existingitem = 
     cart.find(item=>item.variant===variants[selectedvariant])
  
       const[qty,setqty]=useState(iscart ? existingitem.qty : 1 )
    const [success,setsuccess]=useState(false)
    const handlechange=direction=>{
        if(qty === stock[selectedvariant].qty && direction === "up"){
            return null
        }
        if(qty === 1 && direction ==="down"){
            return null
        }
        const newQty=direction==="up" ? qty+1 : qty-1
        setqty(newQty)

        if(iscart){
            if(direction === 'up'){
                dispatchcart(addtocart(variants[selectedvariant],stock,1,name))
            }else if(direction === 'down'){
               dispatchcart(removefromcart(variants[selectedvariant],1))
                
            }
        }
    }

  
    const handlecart=()=>{

        setsuccess(true)

        dispatchcart(
 addtocart( 
   variants[selectedvariant],
     stock[selectedvariant].qty,
     qty,
     name,
            ))
    }
   
    
    useEffect(()=>{
        if(stock===null || stock === -1){
        return undefined
    }
  else if(qty>stock[selectedvariant].qty){
    
     setqty(stock[selectedvariant].qty)


   }
    },[stock,selectedvariant])

    useEffect(()=>{
        let timer 

        if(success){
            timer = setTimeout(() => setsuccess(false), 1500);
        }
        return ()=>clearTimeout(timer)
    },[success])
    return(
        <Grid item>
            <ButtonGroup classes={{root:classes.maingroup}}>
                <Button classes={{root:clsx(classes.endbutton,classes.QtyButton)}} >
                    <Typography variant="h3" classes={{root: classes.qtytext}}>
                       {qty}
                    </Typography>
                </Button>
                <ButtonGroup orientation="vertical">
                   <Button onClick={()=>handlechange("up")} classes={{root:classes.editbutton}}>
                     <Typography variant="h3" classes={{root: classes.qtytext}}>
                        +
                    </Typography>
                   </Button>

                    <Button onClick={()=>handlechange("down")} classes={{root:clsx(classes.editbutton,
                      classes.minusbutton)}}>
                     <Typography variant="h3" classes={{root:clsx( classes.qtytext,
                        classes.minus)}}>
                        -
                    </Typography>
                   </Button>
                </ButtonGroup>
               {(iscart ? null : <Button 
                onClick={handlecart}

                classes={{root:clsx(classes.endbutton,classes.cartButton,{
                     [classes.success]:success
                }
                )}}>
                        {success ? (
       <Typography variant="h3" classes={{root:classes.qtytext}}>
                       🗸
                        </Typography>
                       ) : (
                         <Badge overlap="circle" 
                        classes={{root:classes.badgebutton}}
                        badgeContent="+" >
                <Cart color="#fff"/>
                </Badge>
                      )}
                        
                </Button>)}
            </ButtonGroup>
        </Grid>
    )
    
}