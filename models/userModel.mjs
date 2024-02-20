import { Schema, model } from "mongoose";

const User = Schema(
  {
    username: {
      type: String,
      require: [true, "Please enter username"],
    },
    password: {
      type: String,
      require: [true, "Please enter password"],
    },
    email: {
      type: String,
      require: [true, "Please enter email"],
      unique: [true, "Email already taken"],
    },
  },
  { timestamps: true }
);

export default model("Users", User);
