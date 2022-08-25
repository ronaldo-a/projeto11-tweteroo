import express from "express";

const server = express()

server.get("/", (req, res) => {
    res.send("FOIIIIIII")
})

server.listen(5000, () => {console.log("foiiii")})