import { Simulation } from "./simulation";

import path from "path";
import express from "express";

const app = express();

const sim: Simulation = new Simulation(8080, 10, [ 50, 50 ], [ 3, 3 ], [ 3, 4, 3 ], 60);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/Client/main.html"));
})

app.get("/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, "/Client/index.js"));
});

app.listen(8000, () => console.log("webserver running"));