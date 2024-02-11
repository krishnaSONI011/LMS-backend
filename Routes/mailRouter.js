const express = require("express")
const mailModel = require("../Models/mailModel")

const Router = express.Router()

Router.post("/send-mail",async (req,res)=>{
    try{
        const {senderMail,reciverMail,mailBody} = req.body
        if(!senderMail && !reciverMail && !mailBody) return res.status(200).json({
            status:false,
            message : "empty field"
        })
        const mail  =await new mailModel({
            senderMail,reciverMail,mailBody
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

module.exports = Router