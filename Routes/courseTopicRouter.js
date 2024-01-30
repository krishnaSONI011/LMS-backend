const express = require('express')
const Router = express.Router();
const multer = require('multer');
const path = require('path')
const courseTopicModel = require('../Models/courseTopicModel');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName)
    }
});
const upload = multer({ storage: storage })

Router.post('/add-topic',upload.single('video'),async (req,res)=>{
    try{
        const {courseId,topic} = req.body;
        const topics = new courseTopicModel({
            courseId,topic,videoEmbed:req.file.path
        })
        const save = await topics.save();
        if(save) return res.status(200).json({
            status:true,
            message:'topic created'
        })
        else return res.status(200).json({
            status:false,
            message:'video not save'
        })
    }catch(err){
    console.log(err);
    return res.status(500).json({
        status:false,
        message:'internal server error'
    })
    }
})
Router.get('/get-topic/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const data = await courseTopicModel.find({courseId:id})
        return res.status(200).json({
            status:true,
            message:"getting data",
            data
        })
    }catch(e){
        console.log(e)
    }
})
Router.get('/get/:Topicid',async (req,res)=>{
    try{
        const {Topicid} = req.params;
        const topic = await courseTopicModel.findById({_id:Topicid})
        return res.status(200).json({
            status:true,
            topic
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
})

module.exports = Router