const express = require('express')
const {hasspassword,camparePass} = require('../Helper/passwordHelper')
const userModel = require('../Models/userModel')
const Router = express.Router()


Router.get('/get-user/:userId',async (req,res)=>{
    try{
     const {userId} = req.params
     const user = await userModel.findById({_id:userId})
     if(user) res.status(200).json({
        status:true,
        user
     })
     else res.status(200).json(
        {
            status:false,
            message:"User Not Found"
        }
     )
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
                email: user.email,
                avatar: user.avatar

            }
        })
    }catch(err){
        console.log(err)
    }
})
Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            const pass = await camparePass(password, user.password);
            if (pass) {
                // Update online status
                await userModel.findByIdAndUpdate(user._id, { online: true });

                return res.status(200).json({
                    status: true,
                    message: 'Login',
                    user: {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        online: true, // Include online status in the response
                        avatar:user.avatar
                    }
                });
            } else {
                // Incorrect password
                return res.status(401).json({
                    status: false,
                    message: 'Incorrect password'
                });
            }
        } else {
            // User not found
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        // Handle server error
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
});

Router.post('/logout',async (req,res)=>{
    try{
        const {userId} = req.body
        await userModel.findByIdAndUpdate(userId, { online: false })
        return res.status(200).json({
            status:true,
            message:'log out'
        })
    }catch (error) {
        // Handle server error
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
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

// getting all users
Router.get('/get-all',async (req,res)=>{
    try{
        const users = await userModel.find({})
        return res.status(200).json({
            statsu:true,
            users
        })
    }catch(e){
        console.log(e)
    }
})
Router.post('/update-avatar', async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming userId is sent in the request body
        const avatarImg = req.body.avatarImg; // Assuming avatarImg is sent in the request body

        // Update avatar for the user
        await userModel.findByIdAndUpdate(userId, { avatar: avatarImg });

        // Find the updated user
        const user = await userModel.findById(userId);

        // Return the updated user data
        return res.status(200).json({
            status: true,
            message: 'Avatar updated successfully',
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                online: true,
                avatar: user.avatar
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
});

Router.post('/update-user',async (req,res)=>{
    try{
        const {userId,firstname,lastname,email} = req.body;
         await userModel.findByIdAndUpdate(userId,{firstname:firstname,lastname:lastname,email:email})
        const user = await userModel.findById(userId);

        // Return the updated user data
        return res.status(200).json({
            status: true,
            message: 'updated successfully',
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                online: true,
                avatar: user.avatar
            }
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
})

module.exports = Router;