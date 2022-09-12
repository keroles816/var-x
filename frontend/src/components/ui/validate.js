export default function Validate(values){

    const validtors={
        email: val=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
        password: val =>/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        confirmation: val =>/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        phone:val=>/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
        name:val => val.length > 3,
        message:val=>val.length > 3,
        street:val=>/^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/.test(val),
        zip:val=>/^\d{5}(-\d{4})?$/.test(val),
        promo:val=>true,
        city:val =>val.length !==0,
        state:val => val.length !==0,
    }
    const valid={}
    Object.keys(values).map(filed=>{
        valid[filed]=validtors[filed](values[filed])
    })
    return valid
}