const express = require("express");
const { findOneById, findAll, create, update, destroy } = require("./database/datamanager.js");

const server = express();
const PORT = 3002;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/laptops', (req, res) => {
    findAll().then((laptops) => res.status(200).send(laptops));

});


server.get('/laptops/:id', (req, res) => {
    const { id } = req.params;
    findOneById(Number(id)).then((laptop)=> res.status(200).send(laptop));
    
});


server.post('/laptops', (req, res) => {
    const { marca, procesador, ram, video } = req.body;
    const laptop = {marca, procesador, ram, video}
    create(laptop).then(laptopConId => res.status(201).send(laptopConId));
});


server.put('/laptops/:id', (req, res) => {
    const { id } = req.params;
    const { marca, procesador, ram, video } = req.body;
    const laptop = {id: Number(id), marca, procesador, ram, video}
    update(laptop).then((laptop) => res.status(200).send( `Datos modificados en laptop ${JSON.stringify(laptop)}`));
  
});


server.delete('/laptops/:id', (req, res) => {
    const { id } = req.params;
    destroy(Number(id))
        .then((laptop) => res.status(200).send(`Laptop ${JSON.stringify(laptop)} eliminada`));

});

server.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}/laptops`);
});