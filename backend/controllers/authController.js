const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if(!email || !password){

            return res.status(400).json({
                message: "Email and Password are required"
            });

        }

        const user = await User.findOne({ email });

        if(!user){

            return res.status(401).json({
                message: "Invalid Email"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '1h'
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token: token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            message: "Server Error",

            error: error.message

        });

    }

};


module.exports = {
    loginUser
};