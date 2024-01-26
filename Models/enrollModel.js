const mongo = require('mongoose')

const EnrollSchema = mongo.Schema({
    userId:{
        type:mongo.ObjectId,
        require:true
    },
    courseId:{
        type:mongo.ObjectId,
        require:true
    }
},{timestamps: true })

module.exports = mongo.Model('enrolls',EnrollSchema)