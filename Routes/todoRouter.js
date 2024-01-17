const express = require('express');
const todoModel = require('../Models/todoModel');



const Router = express.Router()

Router.post('/add-todo',async(req,res)=>{
    try{
        const {userId,text} = req.body;
        const todo = new todoModel({
            userId,
            text
        })
        const save = await todo.save();
       if(save) return res.status(200).json({
            status:true,
            message:'todo added',
            
        })
        else return res.status(400).json({
            status:false,
            message:'failed to save'
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status:false,
            message:'somthing went worng try after some time'
        })
    }
});
Router.post('/get-todo',async(req,res)=>{
    try{
        const {userId} = req.body;
        
        const data = await todoModel.find({userId}).sort({_id:-1});
        
        if(data) return res.status(200).json({
            status:true,
            data
        })
        else return res.status(400).json({
            status:false,
            message:''
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            status:false,
            message:'somthing went worng'
        })
    }
})
Router.delete('/delete-todo/:id_todo', async (req, res) => {
    try {
      const { id_todo } = req.params; // Retrieve id_todo from URL parameters
      const Delete_status = await todoModel.deleteOne({ _id: id_todo });
  
      if (Delete_status.deletedCount > 0) {
        return res.status(200).json({
          status: true,
          message: "Todo deleted",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Todo not found or something went wrong",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }
  });
  
module.exports = Router