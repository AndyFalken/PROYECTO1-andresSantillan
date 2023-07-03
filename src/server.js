const express = require("express");
const { findOneById, findAll, create, update, destroy } = require("./database/datamanager.js");

require('dotenv').config();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/laptops', (req, res) => {
    findAll()
        .then((laptops) => res.status(200).send(laptops))
        .catch((error) => res.status(500).send(error.message));

});

server.get('/laptops/:id', (req, res) => {
    const { id } = req.params;
    findOneById(Number(id))
        .then((laptop) => res.status(200).send(laptop))
        .catch((error) => res.status(400).send(error.message));
});

server.post('/laptops', (req, res) => {
    const { marca, procesador, ram, video } = req.body;
    const laptop = { marca, procesador, ram, video };
    create(laptop)
        .then((laptopConId) => res.status(201).send(laptopConId))
        .catch((error) => res.status(400).send(error.message));
});

server.put('/laptops/:id', (req, res) => {
    const { id } = req.params;
    const { marca, procesador, ram, video } = req.body;
    const laptop = { id: Number(id), marca, procesador, ram, video };
    update(laptop)
        .then((laptopActualizada) => res.status(200).send(`Datos modificados en laptop ${JSON.stringify(laptopActualizada)}`))
        .catch((error) => res.status(400).send(error.message));

});

server.delete('/laptops/:id', (req, res) => {
    const { id } = req.params;
    destroy(Number(id))
        .then((laptop) => res.status(200).send(`Laptop ${JSON.stringify(laptop)} eliminada`))
        .catch((error) => res.status(400).send(error.message));

});

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/laptops`);
});