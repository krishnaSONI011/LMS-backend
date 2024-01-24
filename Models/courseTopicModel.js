const mongo = require('mongoose')

const courseTopicSchema = mongo.Schema({
    courseId:{
        type:mongo.ObjectId,
        ref:'course',
        require:true
    },
    topic:{
        type:String,
        require:true
    },
    videoEmbed:{
        type:String,
        require:true
    }
})

module.exports = mongo.model('courseTopics',courseTopicSchema)