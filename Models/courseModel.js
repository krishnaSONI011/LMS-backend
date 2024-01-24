const mongo = require('mongoose');

const courseShema =  mongo.Schema({
   title:{
    type:String,
    require
   },
   subTitle:{
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
   },
   live:{
      type:Boolean,
      default:false,
   }
});
module.exports = mongo.model('courses',courseShema)