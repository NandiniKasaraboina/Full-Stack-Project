
const express = require('express'); //import express into project
const jwt = require('jsonwebtoken');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes=require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes');
const app = express();  //create a backend application(app = backend server)
app.use(cors());
connectDB();

app.use(express.json()); // to understand json data
app.use(userRoutes);
app.use(authRoutes);
app.get('/',(req,res)=>{
    res.send("backend serever is updated first API");
});
app.get('/about',(req,res)=>{
    res.send("this is about page");
});
app.get('/user/:id',(req,res)=>{
    const userData = {
        id: req.params.id,
        name:"nandini",
        role:"full stack developer"
    };
    res.json(userData);
})


app.get('/profile', authMiddleware, (req, res) => {

    res.json({
        message: "Welcome To Protected Profile",
        user: req.user
    });

});
app.listen(5000,()=>{
    console.log("server is running on port 5000"); // start server
});