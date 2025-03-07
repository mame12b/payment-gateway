import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
// route POST/api/users/register
export const registerUser = async(req, res)=>{

    const {username, email, password}= req.body;

    try {
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message : "user already exist"});

        // hash password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user 
        const user = await User.create({username, email, password:hashedPassword});

        if (user) {
            res.status(201).json({
                _id: user.username,
                email:user.email,
                token:generateToken(user.id),
            });
        } else{
            res.status(400).json({message: "invalid user data"});
        
        }

        } catch (error) {
            res.status(500).json({message: error.message});

    }
};
// loghin user 
export const loginUser= async (req, res)=>{
    const {email, password} =req.body;
try {
    const user =await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            username: user.username,
            email:user.email,
            token:generateToken(user.id),
        });

    } else {
        res.status(401).json({message: "invalid email or password"});
    }
} catch (error) {
    res.status(500).json({message: error.message});

}

};
// generate jwt token 
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};