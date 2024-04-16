const mongo = require('mongoose')


const videoWatchedSchema = mongo.Schema({
    userId:{
        type:mongo.ObjectId,
        require:true
    },
    topicId:{
        type:mongo.ObjectId,
        require:true
    },
    checked:{
        type:Boolean,
        require:true
    }
})

module.exports = mongo.model('videoWatched',videoWatchedSchema)