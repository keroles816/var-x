import React ,{useReducer,createContext} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import {setsnackbar} from '../actions'
import feedbackReducer from '../reducers/feedback-reduce'


export const Feedbackcontext=createContext()
const FeedbackProvider=Feedbackcontext.Provider

export function FeedbackWrapper({children}){

const [feedback,dispatchfeedback]=useReducer(feedbackReducer,
    {open:false,
  backgroundColor: "",message:""})

return(
   
    <FeedbackProvider value={{feedback,dispatchfeedback}}>
        {children}
        <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={() =>dispatchfeedback(setsnackbar({open:false}))}
         message={feedback.message}
    anchorOrigin={{vertical:"top",horizontal:"center"}}
    ContentProps={{
        style:{
            backgroundColor:feedback.backgroundColor,
          fontSize:'1.25rem'
           },
           }
           }/>
    </FeedbackProvider>

    
)

}
