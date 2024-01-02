import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    user: {   
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

// Comment export
const Comment = mongoose.model("comment", commentSchema);

export default Comment;
