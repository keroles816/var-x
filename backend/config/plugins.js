module.exports=({env})=>(

  {email:{
    provider:'sendgrid',
    providerOptions:{
      apiKey:env("SENDGRID_API_KEY")
    },
    settings:{
      defaultFrom:"abdelmesehgaber1968@gmail.com",
      defaultTo:'abdelmesehgaber1968@gmail.com',
    }
  }}
)
