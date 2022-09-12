/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"

import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "../footer"

import { makeStyles } from "@material-ui/core/styles"
   


const usestyle=makeStyles(theme=>({
  spacer:{
   marginBottom:'5rem',
   [theme.breakpoints.down('md')]:{
    marginBottom:'2rem',
   }
  },
}))
const Layout = ({ children }) => {
  const classes=usestyle()
  const data = useStaticQuery(graphql`
   query Getcatgory {
  allStrapiCatgory {
    edges {
      node {
        name
        strapiId
      }
    }
  }
}

  `)
  

  return (
    <>
      <Header  catagories={data.allStrapiCatgory.edges} />
      <div className={classes.spacer}></div>
      
        <main>{children}</main>
        
      
      <Footer/>
    </>
  )
}



export default Layout
