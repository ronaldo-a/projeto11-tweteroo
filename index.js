import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());

let users = [];
let avatar;

const tweets = [];

server.post("/sign-up", (req, res) => {
    users.push(req.body);
    avatar = req.body.avatar
    res.send("OK");
})

server.post("/tweets", (req, res) => {
    req.body.avatar = avatar;
    if (tweets.length === 10) {
        tweets.pop();
        tweets.splice(0, 0, req.body);
    } else {
        tweets.splice(0, 0, req.body);
    }
    res.send("OK")
})

server.get("/tweets", (req, res) => {
   res.send(tweets)
})

server.listen(5000, () => {console.log("foiiii")})