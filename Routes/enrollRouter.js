const express = require('express');
const enrollModel = require('../Models/enrollModel');

const Router = express.Router()

Router.post('/new-enroll', async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const user = await enrollModel.find({ userId });

        if (user && user.length > 0) {
            
            const match =  user.filter(enrollment =>  enrollment.courseId == courseId);
            
            if (match && match.length > 0) {
                return res.status(200).json({
                    status: true,
                    message: "You are already registered",
                });
            }
        } else {
            const enroll = new enrollModel({
                userId, courseId
            });

            const savedEnrollment = await enroll.save();

            if (savedEnrollment) {
                return res.status(200).json({
                    status: true,
                    message: "You are enrolled",
                });
            }
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
});

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