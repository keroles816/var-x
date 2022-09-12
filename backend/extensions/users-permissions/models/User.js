

module.exports={
lifecycles:{


beforeCreate(data){
data.paynmentmethod=[
{brand:"",last4:""},
{brand:"",last4:""},
{brand:"",last4:""},]


 data.contactinfo=[
{name:data.username,email:data.email,phone:""},
{name:"",email:"",phone:""},
{name:"",email:"",phone:""},
]

data.locations=[
{street:"",zip:"",city:"",state:""},
{street:"",zip:"",city:"",state:""},
{street:"",zip:"",city:"",state:""},
]
},




},


};
