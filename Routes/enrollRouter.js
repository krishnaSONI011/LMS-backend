const express = require('express');
const enrollModel = require('../Models/enrollModel');

const Router = express.Router()

Router.post('/new-enroll', async (req,res)=>{
    try{
        const {userId,courseId} = req.body;
        const enroll = new enrollModel({
            userId,courseId
        })
        const save = await enroll.save()
        if(save) return res.status(200).json({
            status:true,
            message:"You are enroll"
        })
    }catch(e){
        console.log(e)
    }
})
Router.get('/get-enroll/:userId', async (req,res)=>{
    try{
        const {userId} = req.params;
        const enrolls = await enrollModel.find({userId})
        if(enrolls) return res.status(200).json({
            status:true,
            enrolls
        })
    }catch(e){
        console.log(e)
    }
})
module.exports = Router