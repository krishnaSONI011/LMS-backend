const express = require('express')


const Router = express.Router()

Router.post('/add-todo',async(req,res)=>{
    try{
        const {text} = req.body;
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status:false,
            message:'somthing went worng try after some time'
        })
    }
})