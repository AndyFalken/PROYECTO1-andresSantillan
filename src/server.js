const express = require("express");
const server = express();
const PORT = 3002;

server.get('/laptops', (req, res) => {
    res.status(200).send("Laptops");
});


server.get('/laptops/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Laptop ${id}`);
});


server.post('/laptops', (req, res) => {
    res.status(201).send(`Laptop creada`);
});


server.put('/laptops/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Datos modificados en laptop ${id}`);
});


server.delete('/laptops/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Laptop ${id} eliminada`);

});

server.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}`);
});