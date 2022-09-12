import React from "react";
import {ThemeProvider}from '@material-ui/core/styles'
import theme from "./theme"
import { ApolloWrapper } from "../../apollo/appolo-wrapper"
import { UserWrapper,FeedbackWrapper,CartWrapper } from "../../context"


 export default ({ element })=>{
     return(
         <ThemeProvider theme={theme}>
           <ApolloWrapper>
            <UserWrapper>
                <FeedbackWrapper>
                  <CartWrapper>{element}</CartWrapper>
            </FeedbackWrapper>
             </UserWrapper>
            </ApolloWrapper>
  </ThemeProvider> 
     )
 
 }