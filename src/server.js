const express = require("express");
const { findOneById, findAll, create, update, destroy } = require("./database/datamanager.js");

const server = express();
const PORT = 3002;
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/laptops', (req, res) => {
    findAll().then((laptops) => res.status(200).send(`Laptops ${laptops}`));

});


server.get('/laptops/:id', (req, res) => {
    const { id } = req.params;
    findOneById(id).then((laptop)=> res.status(200).send(`Laptop ${laptop.id}`));
    
});


server.post('/laptops', (req, res) => {
    const { marca, procesador, ram, video } = req.body;
    const laptop = {marca, procesador, ram, video}
    create(laptop).then(() => res.status(201).send(`Laptop creada`));
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
        .then((laptopId) => res.status(200).send(`Laptop ${laptopId} eliminada`));

});

server.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}`);
});