exports.createPages=async({graphql,actions})=>{
const{createPage}=actions
const result=await graphql(
  `
 {
 products:allStrapiProduct {
    edges {
      node {
        name
        strapiId
         description
          catgory{
         name
        }
        variants{
          color
          id
          price
          style
          size
          images {
            url
          }
        }

      }
    }
  }
  categories:allStrapiCatgory {
    edges {
      node {
        name
        strapiId
        description
        filteroptions{
           Size{
          checked
          label
           }
          style{
          checked
           label
          }
          color{
          checked
           label
          }
        }
        
      }
    }
  }
}

`
)
if(result.errors){
  throw result.errors
}
const products =result.data.products.edges
const categories=result.data.categories.edges


products.forEach(product => {
    createPage({
      path: `/${product.node.catgory.name.toLowerCase()}/${
        product.node.name.split("-")[0].toLowerCase()
      }`,
      component: require.resolve("./src/templates/productDetail.js"),
      context: {
        name: product.node.name,
        id: product.node.strapiId,
        category: product.node.catgory.name,
       description:product.node.description,
       variants:product.node.variants,
       product:product
      },
    })
  })

categories.forEach(category => {
    createPage({
      path: `/${category.node.name.toLowerCase()}`,
      component: require.resolve("./src/templates/productsList.js"),
      context:{
        name: category.node.name,
        description:category.node.description,
        id: category.node.strapiId,
        filteroptions:category.node.filteroptions,
      },
    })
  })
}
