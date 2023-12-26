const express = require('express')
const env = require('dotenv')
const db = require('./db')
const userRoutes = require('./Routes/userRoute')
const cors = require('cors')
const courseRouter = require('./Routes/coursesRouter')
const app =express()
// middlewares
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors())
// database here 

db ()
// env config( );

env.config()
const port  = process.env.PORT  || 8000 ;
app.listen(port , ()=>{
    console.log('server Start',port)
});

app.get('/' , (req,res) =>{
    res.send("back side")
})
app.use('/api/user',userRoutes);
app.use('/api/course',courseRouter)