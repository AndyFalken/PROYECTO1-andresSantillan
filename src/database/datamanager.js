const fs   = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data.json");

function escribir(contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(ruta, JSON.stringify(contenido, null, "\t"), "utf8", (error) => {
            if (error) reject(new Error("Error. No se puede escribir"));

            resolve(true);
        });
    });
}

function leer() {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (error, result) => {
            if (error) reject(new Error("Error. No se puede leer"));

            resolve(JSON.parse(result));
        });
    });
}

function generarId(laptops) {
    let mayorId = 0;

    laptops.forEach((laptop) => {
        if (Number(laptop.id) > mayorId) {
            mayorId = Number(laptop.id);
        }
    });

    return mayorId + 1;
}


async function findOneById(id) {
   const laptops = await leer ();
   const laptop = laptops.find((element) => element.id === id );
   return laptop;
}

async function findAll() {
    const laptops = await leer()

    return laptops;
}

async function create(laptop) {
    const laptops = await leer ()
    const laptopConId = { id: generarId(laptops), ...laptop }
    laptops.push(laptopConId);
    await escribir(laptops)

    return laptopConId;
}

async function update(laptop) {
    const laptops = await leer();
    const indice = laptops.findIndex((element) => element.id === laptop.id);
    laptops[indice] = laptop;
    await escribir(laptops);

    return laptops[indice];
}

async function destroy(id) {
    const laptops = await leer()
    const indice = laptops.findIndex((element) => element.id === id);
    const laptop = laptops[indice];
    laptops.splice(indice, 1);
    await escribir(laptops);

    return laptop;
}

module.exports = { findOneById, findAll, create, update, destroy };