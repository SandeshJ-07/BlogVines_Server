import express, { application } from "express";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("Ga");
    return  res.send("<h1>Hello World</h1>");
})

export default router;