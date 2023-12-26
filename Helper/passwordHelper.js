const bcrypt =require('bcrypt');

const hasspassword = async (password)=>{
    
        const salt =10;
        const hased = await bcrypt.hash(password,salt)
        return hased ;
   
      
   
}
const camparePass = (password,hashpassred) =>{
    return bcrypt.compare(password,hashpassred);
}

module.exports = {hasspassword,camparePass}