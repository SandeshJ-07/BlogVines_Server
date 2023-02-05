import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    max: 30,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false,
  },
  profileImg: {
    type: String,
    required: false,
  },
  isReader: {
    type: Boolean,
    default: true,
  },
  isWriter: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  microsoftId: {
    type: String,
    required: false,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
