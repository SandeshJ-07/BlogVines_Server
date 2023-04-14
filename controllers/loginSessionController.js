import User from "../models/userSchema.js";
import LoginSession from "../models/LoginSessionSchema.js";
import { uuid } from "uuidv4";

// Generate a new login session for the user authenticated from Google
export const generateUserLoginSession = async (request, response) => {
  let user = await User.findOne({
    email: request.body.email,
  });
  try {
    if (user) {
      await LoginSession.deleteMany({ email: request.body.email });
      let session = new LoginSession({
        email: user.email,
        userId: user._id,
        sessionId: uuid(),
        expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
      });
      await session.save();
      return response.status(200).json({ sessionId: session.sessionId });
    } else {
      return response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error Creating Session : " + error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
};

// Get User Email from sessionId
export const getUserIdFromSessionId = async (request, response) => {
  try {
    let session = await LoginSession.findOne({
      sessionId: request.body.sessionId,
    });
    if (session) {
      if (session.expires < new Date()) {
        return response.status(401).json({ message: "Session expired" });
      }
      let user = await User.findOne({ email: session.email });
      await LoginSession.deleteOne({ sessionId: request.body.sessionId });
      return response.status(200).json({
        userId: session.userId,
        email: session.email,
        username: user.username,
      });
    } else {
      return response.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.log("Error getting UserId from SessionId", error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
};
