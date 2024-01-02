import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      default: "user",
      enum: ["admin", "user", "siteAdmin"],
      // default: "user",
      // enum: ["admin", "user", "siteAdmin"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    comment: [
      {
        text: String,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre('find', function (next) {
    // Belirli bir koşul sağlandığında çalışan işlemler
    console.log('Belirli bir koşul (find-get) sağlanmadan hemen önce çalıştım');
  next();
});

const User = mongoose.model("user", UserSchema);

export default User;
