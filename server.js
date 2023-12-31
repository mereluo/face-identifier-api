import express, { json, urlencoded } from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import "dotenv/config.js";

import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleImage, handleAPI } from "./controllers/image.js";
import { handleProfile } from "./controllers/profile.js";

const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB,
    },
});

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("success");
});
app.post("/signin", (req, res) => {
    handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
    handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
    handleProfile(req, res, db);
});
app.put("/image", (req, res) => {
    handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
    handleAPI(req, res);
});
app.listen(8080, () => {
    console.log("app is running on port 8080");
});

/*
/                --> res = this is working
/signin          --> POST = success/fail
/register        --> POST = user
/profile/:userID --> GET = user
/image           --> PUT = user
*/
