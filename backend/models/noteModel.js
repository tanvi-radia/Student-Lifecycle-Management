import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum : ['School' , 'College'],
      required : true
    },
    subcategory : {
      type : String , 
      enum : ['Academic' , 'Sports' , 'Cultural' , 'Internships' , 'Club', 'Other'],
      required : true
    },
    certificate : {
      type : String
    },
    isVerified : {
      type : Boolean,
      default : false
    },
    s_id : {
      type : String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
