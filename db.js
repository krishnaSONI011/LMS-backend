const mongoose = require('mongoose')

const db = async ()=>{
    try{
        const con = await mongoose.connect('mongodb+srv://soni01krishna:soni@cluster0.j9eg0m9.mongodb.net/LMS');
        if(con) console.log('connected')
        else if(!con) console.log('not connected')
    }catch(err){
        console.log(err)
    }
}

module.exports = db ;