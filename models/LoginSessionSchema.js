import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    userId : {type: String, required: true},
    email  : {type: String, required: true},
    sessionId: {type: String, required: true},
    expires: {type: Date, required: true},
});

const session = mongoose.model('loginSession', SessionSchema);
export default session;