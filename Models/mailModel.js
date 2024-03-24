const mongo = require('mongoose')

const mailSchema = mongo.Schema({
    senderMail:{
        type:String
    },
    userName:{type:String},
    reciverMail:{
        type:String
    },
    mailBody:{
        type:String
    }
},{timestamps:true})
module.exports = mongo.model('mails',mailSchema)