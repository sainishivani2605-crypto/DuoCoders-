const User = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
    try{
   const  { name, email, password, phone, role } = req.body;

    if (!email || !password || !name || !phone) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password,10);
const user = await User.create({
    name,
    email,
    password:hashedPassword,
    phone,
    role ,
});
    return res.status(201).json({
        message: "User added successfully",
        data: user,
    });


} catch(err) {
    res.status(500).json({
        message:err.message
    });
}
}
const getUser = async(req, res) => {
    try {
        const users = await User.find();

        return res.json(users);
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const loginUser = async(req,res) =>{
    try{
            const {email,password} = req.body;
            if(!email || !password){
                return res.status(400).json({
                    message:"Email and password are required"
                });
            }
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({
                    message:"User not found"
                });
            }

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(401).json({
                    message:"Invalid password"
                });
            }
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );
            return res.status(200).json({
                message: "Login Successful",
                token,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            });
    } catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports = {
    createUser,
    getUser,
    loginUser,
};