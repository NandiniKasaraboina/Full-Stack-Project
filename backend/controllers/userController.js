const User = require('../models/User');
const bcrypt = require('bcryptjs');
const getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

};

const getUserById = (req, res) => {

    const users = [
        {
            id: 1,
            name: "nandini",
            role: "full stack developer"
        },
        {
            id: 2,
            name: "rahul",
            role: "backend developer"
        },
        {
            id: 3,
            name: "ishu",
            role: "software developer"
        }
    ];

    const userId = parseInt(req.params.id);

    const user = users.find((u) => u.id === userId);

    if(user){
        res.json(user);
    }
    else{
        res.json({
            message: "user not found"
        });
    }

};




const createUser = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        if(!name || !email || !password || !role){

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const existingUser = await User.findOne({ email });

        if(existingUser){

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            message: "User Registered Successfully",
            user: newUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

};




const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, role },
            { returnDocument: 'after'}
        );

        if(!updatedUser){

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        res.status(200).json({
            message: "User Updated Successfully",
            user: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

};
const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        res.status(200).json({
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};