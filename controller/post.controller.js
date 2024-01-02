import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const postCreate = async (req, res) => {
  const caption = req.body.caption;
  const postfield = {};
  postfield.user = req.user;

  const user = postfield.user.id;

  if (!user) {
    return res.status(400).send("User not found");
  }

  try {
    const newPost = new Post({
      user: user,
      caption,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    console.log("Error while uploading Post");
    return res.status(400).send("Internal Server Error");
  }
};

export const getPosts = async (req, res) => {
  // post hk.
  try {
    const user = await Post.find({});
    const post = await Post.find()
      .populate("user", ["name", "email", "roles"])
      .populate({
        path: "comment",
        populate: "user",
      });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getPostToComments = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Belirli bir post'a ait tüm comment'leri çekme
    const comments = await Comment.find({ post: postId })
      .populate("user", ["name", "email"])
      .populate("post", ["caption"])
      .populate({
        path: "comments",
        populate: {
          path: "post",
          select: ["caption"],
        },
        select: ["text"],
      });

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// update and delete and myPosts eklenecek

export const removePost = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Post.findOneAndDelete({ _id: id });

    return res.status(200).send(deleted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// classic update
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatePost);
};
