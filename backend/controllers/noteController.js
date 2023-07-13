import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

const CreateNote = asyncHandler(async (req, res) => {
  const { title, year, category, subcategory } = req.body;
  console.log(title, year, category, subcategory);

  // console.log("req.file ", req);
  // const certificate = req.file.filename;
  const certificate = "cert.png";

  // console.log(req);

  if ((!title, !year, !category)) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const thisUser = await User.findById(req.user._id);
    console.log("This user", thisUser);
    const note = new Note({
      user: req.user._id,
      s_id: thisUser.s_id,
      title,
      year,
      category,
      subcategory,
      certificate,
    });

    const createdNote = await note.save();
    console.log(createdNote);

    res.status(201).json(createdNote);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const UpdateNote = asyncHandler(async (req, res) => {
  const { title, year, category, subcategory } = req.body;
  // const certificate = req.file.filename;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.year = year;
    note.category = category;
    note.subcategory = subcategory;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };
