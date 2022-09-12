import * as React from "react"
import Layout from "../components/ui/layout"
import HeroBlock from '../components/home/HeroBlock'
import PromotionalProduct from "../components/home/promotionalproducts"
import FeatuaredProduct from "../components/home/featuaredproduct"
import Marktingbuttons from "../components/home/markitingbuttons"
import Calltoaction from "../components/home/calltoaction"
const IndexPage = () => (
    <Layout>
     <HeroBlock/>
     <PromotionalProduct/>
     <FeatuaredProduct/>
     <Marktingbuttons/>
     <Calltoaction/>
    </Layout>
)

export default IndexPage