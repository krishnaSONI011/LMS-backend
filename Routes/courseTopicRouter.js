const express = require('express')
const Router = express.Router();
const multer = require('multer');
const courseTopicModel = require('../Models/courseTopicModel');


Router.post('/add-topic',async (req,res)=>{
    try{
        const {topic,videoEmbed} = req.body;
        const topics = new courseTopicModel({
            courseId,topic,videoEmbed
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