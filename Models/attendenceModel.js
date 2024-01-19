const mongo = require('mongoose')

const attendenceShema = mongo.Schema({
    userId:{
        type:mongo.ObjectId,
        ref:"user",
        required:true
    },
    year:{
        type:String,
        require:true,

    },
    month:{
        type:String,
        require:true
    },
    day:{
        type:String,
        require:true
    }
})

module.exports = mongo.model('attendences',attendenceShema)