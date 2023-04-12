import mongoose from "mongoose";

const Connection = async(username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.xr5r8xu.mongodb.net/blogvines?retryWrites=true&w=majority`;
    try{
        mongoose.set('strictQuery', true);
        mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology : true});
        console.log("Database Connected Successfully");
    }
    catch(error)
    {
        console.log("Error COnnecting Database : ", error.message);
    }
}

export default Connection;