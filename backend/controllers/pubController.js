import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";

export const pubFetchById = asyncHandler(async (req, res) => {
  console.log("pub req sid", req.params.sid);
  const achs = await Note.find({ s_id: req.params.sid, isVerified: true });
  res.json(achs);
});
