import express from "express";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import config from "config";

export const userCreate = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const { name, email, password, roles } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      password,
      roles,
    });
    console.log("User", user);

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id, // const payload = { user: { id: user.id } }
      },
    };
    console.log("payload", payload);

    jwt.sign(
      payload, // { user: { id: user.id } }
      config.get("jwtSecret"), // (videoda) jwtToken yazdı ama URL kısmında jwtSecret yazıyordu bende onda  bunu yazdım
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        console.log("token", token);
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getUsers = async (req, res) => {
  // verifyAccessToken
  try {
    const users = await User.find().sort({ created_at: -1 });
    // users = users.map((user:any)=>{
    //      user.avatar = (process.env.STORAGE_PATH +  user.avatar as string);
    //      return user;
    // })

    return res.status(200).json({ error: false, result: users });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

export const remove = async (req, res) => {

  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    user.deleteOne()

    return res.status(200).send("Success deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateUser);
};