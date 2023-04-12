import User from "../models/userSchema.js";
// import Session from "../models/sessionSchema.js";
import passwordHash from "password-hash";
import dotenv from "dotenv";

dotenv.config();

// Params : email/username/contact
// Returns : sessionId
// This function logs in the user and creates a session
export const userLogin = async (request, response) => {
  try {
    var user = await User.findOne({
      $or: [
        { email: request.body.username },
        { contact: request.body.username },
        { username: request.body.username },
      ],
    });

    let correctuser = null;
    if (user)
      [
        (correctuser = passwordHash.verify(
          request.body.password,
          user.password
        )),
      ];
    if (user && correctuser) {
      return response
        .status(200)
        .json({ sessionId: null, username: user.username , success:1});
    } else {
      return response.json({ message: "Invalid Credentials", success:0 });    
    }
  } catch (error) {
    console.log(`Error while logging in user : ${error}`);
  }
};

// Params : firstname, lastname, username, email, password
// Returns : sessionId
// This function registers the user and creates a session
export const userRegister = async (request, response) => {
  try {
    var user = await User.findOne({
      $or: [{ email: request.body.email }, { username: request.body.username }],
    });
    if (user) {
      return response.status(409).json({ message: "User already exists" });
    }
    let password = passwordHash.generate(request.body.password);
    user = {
      firstName: request.body.email.split("@")[0] || "",
      lastName: request.body.lastname || "",
      username: request.body.username,
      email: request.body.email,
      password: password,
    };
    const newUser = new User(user);
    await newUser.save();
    // Create a session here
    if (newUser) {
      return response
        .status(201)
        .json({ sessionId: null, username: newUser.username });
    } else {
      return response.status(500);
    }
  } catch (error) {
    console.log(`Error while registering user : ${error}`);
  }
};

// Params : email, contact, username
// Returns : true/false
// This function verifies if the user details are already present in the database
export const verifyUserDetails = async (request, response) => {
  try {
    let user1 = await User.findOne({ email: request.body.email });
    let user2 = await User.findOne({ contact: request.body.contact });
    let user3 = await User.findOne({ username: request.body.username });
    response.status(200).json({
      email: user1 !== null,
      contact: user2 !== null,
      username: user3 !== null,
    });
  } catch (error) {
    console.log(`Error while verifying user details : ${error}`);
  }
};

// Get User Details by username or email
export const getUserDetails = async (request, response) => {
  try {
    var user = await User.findOne({
      $or: [{ email: request.body.detail }, { username: request.body.detail }],
    });
    if (user) {
      response.status(200).json({
        username: user.username,
        email: user.email,
      });
    } else {
      response.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(`Error while getting user details : ${error}`);
  }
};
