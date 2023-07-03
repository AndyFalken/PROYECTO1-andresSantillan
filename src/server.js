const express = require("express");
const server = express();
const PORT = 3002;

server.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}`);
});