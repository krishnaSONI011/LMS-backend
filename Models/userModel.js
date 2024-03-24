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
    },
    online:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:"/images/avatar5.png"
    }
});
module.exports= mongo.model('users',userSchema);