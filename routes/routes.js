import express, { application } from "express";

const router = express.Router();

router.get("/try", (req, res) => {
    res.json("Hello World");
})

export default router;
