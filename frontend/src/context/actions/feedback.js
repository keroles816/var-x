import { SET_SNACKBAR } from "./actions-types"



export const setsnackbar=({status,message,open})=>(

    {
        type:SET_SNACKBAR,
        payload:{status,message,open},
    }
)