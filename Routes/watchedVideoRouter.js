const express = require('express')
const watchedVideos = require('../Models/watchedVideos')

const Router = express.Router()


Router.get('/get-video/:userId',async (req,res)=>{
    try{
        const {userId} = req.params
        const result = await watchedVideos.find({userId})
        return res.status(200).json({
            status:true,
            result
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status:false,
            message:"Somthing went worng"
        })
    }
})
Router.post('/add-checked',async (req,res)=>{
    try{
        const {userId,topicId,checked} = req.body
        const checkedResult = new watchedVideos({
            userId,topicId,checked
        })
        const result = await checkedResult.save()
        return res.status(200).json({
            status:true,
            message:"checked"
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status:false,
            message:"Somthing went worng"
        })
    }
})

module.exports = Router