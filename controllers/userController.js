import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import token from "../middleware/authUser.js"



// Register user : /api/user/register
export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.json({success: false, message: 'Missing Details'})
        }

        const existingUser = await User.findOne({email})

        if(existingUser)
            return res.json({success: false, message: 'User Already exists'})

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashedPassword})

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token',token, {
            httpOnly: true, // prevent javascript to access cookie
            secure: process.env.NODE_ENV === "production", // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })

        return res.json({success:true, user: {email: user.email, name: user.name}})
        

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
        
    }

}


// Login User : /api/user/login

export const login = async (req,res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.json({success: false, message: 'Email and Password are required'});

        const user =await  User.findOne({email});

        if(!user){
            return res.json({success: false, message: 'Invalid Email or Password'});

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            return res.json({success: false, message: 'Invalid Emailor Password'});

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token',token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        })

        return res.json({success: true, user: {email: user.email, name: user.name}});


    } catch (error) {
        
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

// Check Auth : /api/user/is-auth

export const isAuth = async(req,res)=>{
    try {
        const {userId} = req.body
        const user = await User.findById(userId).select("-password")
        return res.json({success: true, user})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}


// Logout user : /api/user/logout

export const logout = async (req,res)=>{
    try {
        res.clearCookie('token',token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return  res.json({success: true, message: "Log Out"})
        
    } catch (error) {
         console.log(error.message)
        res.json({success: false, message: error.message})
        
    }
}