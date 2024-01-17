import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"; 

import jwt from "jsonwebtoken";

const saltRounds = 10;

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, profilePicture, isAdmin } = req.body;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log(req.body);
    console.log(passwordHash);

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }

    const newuser = new User({
      username,
      email,
      password: passwordHash,
      profilePicture,
      isAdmin,
    });

    await newuser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.name);
    /*   if (error.name === 'ValidationError') {
        const errorMessages = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ errors: errorMessages });
        next(error)
      } else {
        res.status(500).json({ message: "An error occurred during sign-up" });
        next(error)
      }  */
    next(error);
  }
};

//SignIn API

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userCheck = await User.findOne({ $or: [{ username: username }, { email: username }] });

    console.log(userCheck);

    if (userCheck) {
      const isPasswordValid = await bcrypt.compare(password, userCheck.password);

      if (isPasswordValid) {
        const token = jwt.sign({ id: userCheck._id }, process.env.JWT_SECRET);

        const {password:pass, ...rest} = userCheck._doc

        res.status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json({ message: "User successfully logged in", user: rest});

      } else {
        return next(errorHandler(400, "Password did not match"));
      }
    } else {
      return next(errorHandler(400, "Username not found"));
    }
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal Server Error"));
  }
};


