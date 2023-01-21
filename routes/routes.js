import express, { application } from "express";

const router = express.Router();

router.get("/try", (req, res) => {
    console.log("Ga");
    return  res.json("Hello World");
})

export default router;
