import React,{useContext} from "react"
import Layout from '../components/ui/layout'

import { Usercontext } from "../context"
import { setuser } from "../context/actions"
import Authportal from "../components/auth/authportal"
import Settingsportal from "../components/settings/settings.-portal"
export default function Account() {
  const {user}=useContext(Usercontext)
  
return(
    <Layout>
    {user.jwt && user.onboarding ? (
      <Settingsportal/>
    ): (<Authportal/>

    )}
    
    </Layout>
)

}  