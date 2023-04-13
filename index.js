import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";

// To establish connection with databases
import Connection from "./database/db.js";
import Routes from "./routes/routes.js";
import SocialAuthRoutes from "./routes/socialAuthRoutes.js";

dotenv.config();

const app = express();

const PORT = 80;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username,password);

app.use(cookieSession({
    name:'auth-session',
    keys: ['key1','key2']
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', Routes);
app.use('/social/auth/', SocialAuthRoutes);
app.listen(PORT,()=> console.log(`Server is running on port : ${PORT}`));