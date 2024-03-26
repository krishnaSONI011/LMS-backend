
const mailModel = require("../Models/mailModel")
const express = require('express')
const Router = express.Router()

Router.post("/send-mail",async (req,res)=>{
    try{
        const {senderMail,reciverMail,mailBody,userName} = req.body
        if(!senderMail && !reciverMail && !mailBody) return res.status(200).json({
            status:false,
            message : "empty field"
        })
        const mail  =await new mailModel({
            senderMail,reciverMail,mailBody,userName
        })
        await mail.save()
        return res.status(200).json({
            status:true,
            message:"mail send"
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status:false,
            message:"somthing went worng"
        })
    }
})

Router.get('/get-mails/:userMailId',async (req,res)=>{
    try{
        const {userMailId} = req.params
        
        const userMails = await mailModel.find({reciverMail:userMailId})
         return res.status(200).json({
            status:true,
            userMails
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status:false,
            message:"somthing went wrong"
        })
    }
})
Router.get('/single-mail/:mailId',async (req,res)=>{
    try{
        const {mailId} = req.params
        
        const userMails = await mailModel.findOne({_id:mailId})
         return res.status(200).json({
            status:true,
            userMails
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status:false,
            message:"somthing went wrong"
        })
    }
})
Router.post('/delete-mail',async (req,res)=>{
    try{
        const {userMailId,mailIds} = req.body
        
        for(let i of mailIds){
            await mailModel.findByIdAndDelete({_id:i})
        }
        const userMails = await mailModel.find({reciverMail:userMailId})
         return res.status(200).json({
            status:true,
            message:"mail deleted",
            userMails
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status:false,
            message:"somthing went wrong"
        })
    }
})

module.exports = Router