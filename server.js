const express = require ('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
require("dotenv").config()
const PORT = process.env.PORT||5000


const userRoutes = require('./routes/userRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')

app.use(userRoutes);
app.use(appointmentRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDb is connected Suscessfully"))
.catch((err)=>console.log("MongoDB connection failed",err))

app.listen(PORT ,()=>{
    console.log(`Server is running in the PORT ${PORT}`)
})