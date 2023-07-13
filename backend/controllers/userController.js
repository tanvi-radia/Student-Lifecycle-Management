import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import pkg from 'mongoose';
const { ObjectId } = pkg;

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { s_id, password } = req.body;

  
  const user = await User.findOne({ s_id});

  if (user && (await user.matchPassword(password))) {
    res.json({
      s_id: user.s_id,
      _id: user._id,
      name: user.name,
      email: user.email,
      city : user.city,
      contact_number : user.contact_number,
      role : user.role,
      token: generateToken(user._id),
    });
    // res.status(201).send("Logged in Successfullly..");
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { s_id , name, email, password, city, contact_number } = req.body;
  
console.log("s_id",s_id)
  const userExists = await User.findOne({ s_id });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    // s_id : mongoose.Types.ObjectId().str,
    s_id,
    name,
    email,
    password,
    city,
    contact_number
  });
  // res.status(201).send("User Created Successfully.")

  if (user) {
    res.status(201).json({
      s_id: user._id,
      name: user.name,
      email: user.email,
      role : user.role,
      city : user.city,
      contact_number : user.contact_number,
      token: generateToken(user._id),
    }).send("Registered Successfully");
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.s_id = req.body._id || mongoose.Types.ObjectId().str;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.city = req.body.city || user.city;
    user.contact_number = req.body.contact_number || user.contact_number;
    user.role = req.body.role || user.role;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      s_id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      city : updatedUser.city,
      contact_number : updatedUser.contact_number,
      role : updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { authUser, updateUserProfile, registerUser };
