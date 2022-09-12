import React from "react"
import fullstar from '../../images/full-star.svg'
import halfstar from '../../images/half-star.svg'
import emptystar from '../../images/empty-star.svg'
import { makeStyles } from "@material-ui/core"



const usestyle=makeStyles(theme=>({
 size:{
    height:'2rem',
    width: '2rem'
 },



}))
export default function Reating({number}){
const classes=usestyle();
const diff=5-Math.ceil(number)
return(

    <>
    {[...Array(Math.floor(number))].map((e,i)=>(
        <img src={fullstar} alt='full star' key={i} classes={classes.size} />
    ))}
    { number % 1 !==0 ? <img src={halfstar} alt='half star'/>:null }
     {[...Array(diff)].map((e,i)=>(
        <img src={emptystar} alt='full star' key={`${i}-empty`}  />
    ))}
    </>
)

}