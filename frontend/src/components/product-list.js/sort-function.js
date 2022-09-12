export const alphbetic=(data,direction )=>(
    data.sort((a,b)=>{
      const first =a.node.name.toLowerCase()
      const secound =b.node.name.toLowerCase()
      const x = direction ==='asc'?first:secound
      const y=direction ==='asc'?secound:first
      if(x < y)return -1
      if(x>y)return 1
     return 0
    })

)

export const time=(data,direction)=>(
data.sort((a,b)=>{

    const first=new Date(a.node.createdAt)
    const secound=new Date(b.node.createdAt)
     const x=direction ==='asc'?secound:first
     const y = direction ==='asc'?first:secound

     if(x < y)return -1
      if(x>y)return 1

     return 0
     
})

)


export const price=(data,direction)=>(
data.sort((a,b)=>{

    const first=a.node.variants[0].price
    const secound=b.node.variants[0].price
    
     const x=direction ==='asc'?secound:first
     const y = direction ==='asc'?first:secound

     if(x < y)return -1
      if(x>y)return 1

     return 0
     
})

)