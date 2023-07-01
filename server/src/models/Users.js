import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please add a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

export const UserModel = mongoose.model("user", UserSchema);
