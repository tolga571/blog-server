import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    caption: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    imageCloudinaryPublicId: {
      type: String,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;
