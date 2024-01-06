const mongo = require('mongoose')

const todoSchema = mongo.Schema({
    userId:{
        
            type:mongoose.ObjectId,
            ref:"User",
            required:true
        

    },
    text:{
        type:String,
        require
    }
});
module.exports = mongo.model('todos',todoSchema);