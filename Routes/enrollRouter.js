const express = require('express');
const enrollModel = require('../Models/enrollModel');

const Router = express.Router()

Router.post('/new-enroll', async (req,res)=>{
    try{
        const {userId,courseId} = req.body;
        const user = await enrollModel.find({userId})
        if(user && user.length >0){
            const match =  user.filter(user => user.courseId === courseId)
            if(match && match > 0){
                return res.status(200).json({
                    status:true,
                    message:"you are already register"
                })
            }
        }
        else{
            const enroll = new enrollModel({
                userId,courseId
            })
            const save = await enroll.save()
            if(save) return res.status(200).json({
                status:true,
                message:"You are enroll"
            })
        }
       
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