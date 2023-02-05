import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    sessionId: {type: String, required: true},
    logout  : {type: Boolean, default: false},
    expires: {type: Date, required: true},
});

const session = mongoose.model('session', SessionSchema);
export default session;