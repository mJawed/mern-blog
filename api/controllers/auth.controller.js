import  bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


const saltRounds = 10; 

export const signup = async (req,res,next)=>{

try {
    const {username,email,password,profilePicture,isAdmin}=req.body
    const passwordHash = await bcrypt.hash(password,saltRounds)
    console.log(req.body );
    console.log(passwordHash)

    if(!username 
    || !email 
    || !password  
    || username === '' 
    || email === '' 
    || password === ''){

    next(errorHandler(400,"All fields are required"))
    }

   const newuser  = new User({
        username,
        email,
        password:passwordHash,
        profilePicture,
        isAdmin
    });

await newuser.save()

res.status(201).json({ message: "User created successfully" });
    
  } catch (error) {
    console.log(error.name)
  if (error.name === 'ValidationError') {
        const errorMessages = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ errors: errorMessages });
        next(error)
      } else {
        res.status(500).json({ message: "An error occurred during sign-up" });
        next(error)
      } 
     // next(error)
  }
}