import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());

let users = [];
let avatar;

const tweets = [];

server.post("/sign-up", (req, res) => {
    if (req.body.username && req.body.avatar) {
        users.push(req.body);
        avatar = req.body.avatar;
        return res.status(201).send("OK");
    } else {
        res.status(400).send({"erro": "Todos os campos são obrigatórios!"});
    }
    
})

server.post("/tweets", (req, res) => {
    req.body.avatar = avatar;
    if (req.body.tweet && req.body.username) {
        if (tweets.length === 10) {
            tweets.pop();
            tweets.splice(0, 0, req.body);
        } else {
            tweets.splice(0, 0, req.body);
        }
        return res.status(201).send("OK");
    } else {
        res.status(400).send({"erro": "Todos os campos são obrigatórios!"});
    }
    
})

server.get("/tweets", (req, res) => {
    if (req.params.username) {
        let filteredTweets = tweets.filter(tweet => tweet.username === req.params.username);
        return res.send(filteredTweets);
    } else {
        res.send(tweets)
    }
})

server.get("/tweets/:username", (req, res) => {
    if (req.params.username) {
        let filteredTweets = tweets.filter(tweet => tweet.username === req.params.username);
        return res.send(filteredTweets);
    } else {
        res.send(tweets)
    }
})

server.listen(5000, () => {console.log("foiiii")})