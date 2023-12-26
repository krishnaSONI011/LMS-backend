const mongo = require('mongoose')

const userSchema = mongo.Schema({
    firstname:{
        type:String,
        require
    },
    lastname:{
        type:String,
        require
    },
    email:{
        type:String,
        require
    },
    password:{
        type:String,
        require
    }
});
module.exports= mongo.model('users',userSchema);