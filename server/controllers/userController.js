import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id)
        newUser.password = undefined;


        return res.status(201).json({
            message: "User created successfully",
            token,
            user: newUser,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

//controller for user login
//POST: /api/users/register

export const loginUser = async (req, res) => {
    try {
        const {  email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // Check if password is correct
        const isPasswordValid = user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        

        // return success message

        const token = generateToken(user._id)
        user.password = undefined;

        return res.status(200).json({message : "User logged in Successfully" , token , user})

    }catch (error) {
        return res.status(400).json({message : error.message})
    }
}

//controller for getting user by id
//GET: /api/users/data
export const getUserById = async (req, res) => {
    try {
        
        const userId = req.userId;

        // Check if user exists
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        //return user
        user.password = undefined;
        return res.status(200).json({user})

    }catch (error) {
        return res.status(400).json({message : error.message})
    }
}

//controller for getting user resumes
// GET: /api/users/resumes

export const getUserResumes = async (req , res) =>{
    try{
        const userId = req.userId;

        // return user resumes
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}

