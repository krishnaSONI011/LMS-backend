const express = require('express');
const attendenceModel = require('../Models/attendenceModel');

const Router = express.Router();

Router.post('/send-attendence', async (req,res)=>{
    try {
        const {userId,year,month,day} = req.body;
        const users = await attendenceModel.find({userId});
        if(users && users.length > 0 ){
            const filter = users.filter(users => users.year === year && users.month === month && users.day === day);
            if(filter && filter.length > 0){
                return res.status(200).json({
                    status:true,
                    message:"attadence already marked"
                })
            }
            else{
                const attadence = new attendenceModel({
                    userId,
                    year,
                    month,
                    day
                })
                const save = attadence.save()
                if(save) return res.status(200).json({
                    status:true,
                    message:"attaden marked"
                })
            } 
        }
        else {
            const attadence = new attendenceModel({
                userId,
                year,
                month,
                day
            })
            const save = attadence.save()
            if(save) return res.status(200).json({
                status:true,
                message:"attaden marked"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:false,
            message:"internal server error"
        })
    }
})

Router.get('/get-attendence/:userId',async (req,res)=>{
    try{
        let {userId} = req.params ;
        const attendence = await attendenceModel.find({userId:userId})
        return res.status(200).json({
            status:true,
            message:"got data",
            attendence
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:false,
            message:"internal server error"
        })
    }
})

module.exports = Router;