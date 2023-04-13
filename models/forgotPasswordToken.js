import mongoose from "mongoose";

const ForgotPassSchema = new mongoose.Schema({
    userId : {type: String, required: true},
    email  : {type: String, required: true},
    token: {type: String, required: true},
    expires: {type: Date, required: true},
    lastMail : {type: Date, required: false},
});

const forgotPassToken = mongoose.model('forgotPasswordToken', ForgotPassSchema);
export default forgotPassToken;