import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const commentCreate = async (req, res) => {
  console.log(req.body);
  const text = req.body.text;
  const commentfield = {};
  commentfield.user = req.user;

  const user = commentfield.user.id;

  if (!user) {
    return res.status(400).send("User not found");
  }

  try {
    const newComment = new Comment({
      user,
      text,
      post: req.params.postId,
    });
    const post = await Post.findById(req.params.postId);

    post.save();

    await newComment.save();

    await post.updateOne({ $push: { comment: newComment } });

    return res.status(201).json({
      success: true,
      comment: newComment,
    });
  } catch (err) {
    console.log(err);
    console.log("Error while uploading Comment");
    return res.status(500).send("Internal Server Error");
  }
};

export const nestedCommentCreate = async (req, res) => {
  console.log(req.body);
  const text = req.body.text;
  const commentfield = {};
  commentfield.user = req.user;

  const user = commentfield.user.id;
  
  if (!user) {
    return res.status(400).send("User not found");
  }

  const cp = await Comment.findById(req.params.id);
  const objectPostId = cp.post
  const postId = objectPostId.toHexString();

  try {
    // post değişkenini newComment oluşturulmadan önce tanımla
    const newComment = new Comment({
      user,
      text,
      post: postId
    });
    const nestedComment = await Comment.findById(req.params.id);
    
    nestedComment.save();

    await newComment.save();

    // Post'u güncelle, comment'i ekleyerek
    // await post.comment.push(newComment);
    await nestedComment.updateOne({ $push: { comments: newComment } });

    return res.status(201).json({
      success: true,
      comment: newComment,
    });
  } catch (err) {
    console.log(err);
    console.log("Error while uploading Comment");
    return res.status(500).send("Internal Server Error");
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", ["name", "email"])
      .populate("post", ["caption"])
      .populate({
        path: "comments",
        select: ["text"],
        populate: {
          path: "post", // Alt yorumların içindeki post alanını populate et
          select: ["caption"], // caption alanını seç
        },
      });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const removeComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comment = await Comment.findById({ _id: postId });

    comment.deleteOne();

    return res.status(200).send("Success deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const updateComment = async (req, res) => {
  const user = await Comment.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("Comment not found");
  }

  const updateUser = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateUser);
};
