const mongo = require('mongoose');

const courseShema =  mongo.Schema({
   title:{
    type:String,
    require
   },
   logo:{
    type:String,
    
   },
   description:{
    type:String,
    require
   },
   slug:{
    type:String,
    require,
    unique:true
   }
});
module.exports = mongo.model('courses',courseShema)