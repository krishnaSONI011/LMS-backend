const express = require('express')
const multer = require('multer')
const toSlug = require('../Helper/toSlug')
const path = require('path')
const courseModel = require('../Models/courseModel')
const Router = express.Router()
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
Router.post('/add-course',upload.single('image'),async (req,res)=>{
    try {
        const {title,subTitle,description} = req.body
        
        const slug = await toSlug(title)
        const course = new courseModel({
            title,
            subTitle,
            logo:req.file.path,
            description,
            slug:slug
        })
       const status = await course.save()
       if(status) return res.status(200).json({
        status:true,
        message:'course added !'
       })
       else return res.status(400).json({
        status:false,
        message:'somthing went worng please try again'
       })
    } catch (error) {
        console.log(error)
    }
})

Router.get('/get',async (req,res)=>{
    try {
        const courses = await courseModel.find({})
        return res.status(200).json({
            status:true,
            courses
        })
    } catch (error) {
        console.log(error)
        
    }
})
Router.get('/get-frontend',async (req,res)=>{
    try {
        const courses = await courseModel.find({live:true})
        return res.status(200).json({
            status:true,
            courses
        })
    } catch (error) {
        console.log(error)
        
    }
})

Router.get('/get/:slug',async (req,res)=>{
    try{
        const {slug} = req.params;
        const course = await courseModel.findOne({slug:slug});
        if(course) return res.status(200).json({
            status:true,
            course
        })
        else return res.status(400).json({
            status:false,
            message:'product not found'
        })
    }catch(err){
        console.log(err)
    }
})

Router.put('/update-course/:status/:id', async (req, res) => {
    try {
        const live = req.params.status;
        const id = req.params.id;
        const updateData = await courseModel.findByIdAndUpdate(id, {
            live: live
        }, { new: true }); // Move { new: true } to the correct position

        if (updateData) {
            res.status(200).json({
                status: true,
                message: updateData.live,
            });
        } else {
            res.status(404).json({
                status: false,
                message: "Course not found",
            });
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
});

Router.get('/get-course/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const course = await courseModel.findById({_id:id})
        return res.status(200).json({
            status:true,
            course
        })
    }catch(e){
        console.log(e)
    }
})

module.exports = Router