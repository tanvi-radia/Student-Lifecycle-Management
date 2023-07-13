import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";
import User from "../models/userModel.js";

export const getUsers = asyncHandler(async (req, res) => {
  const students = await User.find().sort("-noUnvAch");
  res.json(students);
});

export const getAchList = asyncHandler(async (req, res) => {
  const achs = await Note.find({ s_id: req.params.sid }).sort("isVerified");
  res.json(achs);
});

export const evalAch = asyncHandler(async (req, res) => {
  console.log("Evaluating....");
  const { achStatus, user_sid } = req.body;
  const ach = await Note.findById(req.params.id);

  if (ach) {
    console.log("ach found....", ach.isVerified, user_sid);
    const studArray = await User.find({ s_id: user_sid });
    const stud = studArray[0];
    if (stud) {
      console.log("stud found.....", stud.name);
    } else {
      console.log("stud NOT found.....");
    }
    ach.isVerified = achStatus;
    if (achStatus) {
      stud.noUnvAch -= 1;
    } else {
      stud.noUnvAch += 1;
    }
    const updatedAch = await ach.save();
    console.log("ach updated....", ach.isVerified, stud.noUnvAch);
    const updatedStud = await stud.save();
    res.json(updatedAch);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});
