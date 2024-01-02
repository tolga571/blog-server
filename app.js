import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import routeUser from "./routes/users.js";
import routeProfile from "./routes/profile.js";
import routeAuth from "./routes/auth.js";
import routePost from "./routes/post.js";
import commentRouter from "./routes/comment.js";

const app = express();

// initialize configuration
dotenv.config();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", routeUser);
app.use('/api/auth', routeAuth);
app.use("/api/profile", routeProfile);
app.use("/api/post", routePost);
app.use("/api/comment", commentRouter);
app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5003;

// Connect Database
connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));