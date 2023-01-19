import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// To establish connection with databases
import Connection from "./database/db.js";
import Routes from "./routes/routes.js";

dotenv.config();

const app = express();

const PORT = 5000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username,password);

app.use(cors());
app.use('/', Routes);
app.listen(PORT,()=> console.log(`Server is running on port : ${PORT}`));