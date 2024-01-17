const express = require('express')
const {hasspassword,camparePass} = require('../Helper/passwordHelper')
const userModel = require('../Models/userModel')
const Router = express.Router()


Router.get('/user',async (req,res)=>{
    try{
     
    }
    catch(err){
        console.log(err)

    }
})
Router.post('/add-user',async (req,res)=>{
    try{
        const {firstname,lastname,email,password} =  req.body;
        const hasses = await hasspassword(password);
        const exsitUser = await userModel.findOne({email});
        if(exsitUser) return res.status(200).json({
            status:false,
            message:'user alredy exist try to login'
        })
        const user = new userModel({
            firstname,
            lastname,
            email,
            password:hasses
        })
        await user.save();
        res.status(200).json({
            status:true,
            message:'New User',
            user:{
                id:user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        })
    }catch(err){
        console.log(err)
    }
})
Router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        
        if(user){
            const pass = await camparePass(password,user.password)
            if( pass){
                return res.status(200).json({
                    status:true,
                    message:'Login',
                    user:{
                        id:user._id,
                        firstname:user.firstname,
                        lastname:user.lastname,
                        email:user.email
                    }
                })
            }
            else return res.status(200).json({
                status:false,
                message:"Worng Password"
            });
        }
        else return res.status(200).json({
            status:false,
            message:"invalid user enter again"
        })
    }catch(err){console.log(err)}
})


Router.post('/email-verify',async (req,res)=>{
    try{
        const {email} =req.body;
        const check = await userModel.findOne({email});
        if(check) return res.status(200).json({
            status:true,
            message:'user found',
            user:{
                firstname:check.firstname
            }
        });
        else return res.status(200).json({
            status:false,
            message:'New User'
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = Router;