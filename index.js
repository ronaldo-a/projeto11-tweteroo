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
    if (req.body.tweet && req.headers.user) {
        const tweet = {"tweet": req.body.tweet, "username": req.headers.user, "avatar": avatar}
        if (tweets.length === 10) {
            tweets.splice(0, 0, tweet);
        } else {
            tweets.splice(0, 0, tweet);
        }
        return res.status(201).send("OK");
    } else {
        res.status(400).send({"erro": "Todos os campos são obrigatórios!"});
    }
    
})

server.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page);
    if (page >= 1) {
        const pageTweets = tweets.slice(page*10 - 10, page*10);
        return res.send(pageTweets);
    } else {
        res.status(400).send({"Erro": "Informe uma página válida!"})
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

server.listen(5000, () => {console.log("on air")})