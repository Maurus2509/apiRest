const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const games = require("./database/games");

dotenv.config();

connection.authenticate().then(() => {
    console.log("Conexão Feita");
}).catch((error) => {
    console.log(error);
})

//Body Parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas

app.get("/games", (req, res) => {
    games.findAll().then((game => {
        res.json(game);
    }))
});

app.get("/games/:id", (req, res) => {
    var id = req.params.id;
    games.findOne({
        where: {
            id: id
        }
    }).then(game => {
        res.json(game);
    })
});

app.post("/games/save", (req, res) => {
    var title = req.body.title;

    games.create({
        title: title
    }).then(res.sendStatus(200));
});

app.delete("/games/:id", (req, res) => {
    var id = req.params.id;
    games.destroy({
        where: {
            id: id
        }
    }).then(res.sendStatus(200));
});

app.put("/games/:id", (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    games.update({ title: title }, {
        where: {
            id: id
        }
    }).then(res.sendStatus(200));
});

app.listen(8080, () => {
    console.log("API rodando")
});