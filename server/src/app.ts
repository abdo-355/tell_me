import express from "express";
import {config} from "dotenv";

const app = express()
config();

app.get("/", (req, res, next) => {
    console.log("it's working")
})

app.listen(process.env.PORT ||  8080, () => {
    console.log("connected on port 8080")
})