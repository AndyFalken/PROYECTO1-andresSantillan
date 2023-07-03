const fs = require("fs");
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
    if (!id) throw new Error("Error. El Id está indefinido.");

    const laptops = await leer();
    const laptop = laptops.find((element) => element.id === id);

    if (!laptop) throw new Error("Error. El Id no corresponde a una laptop en existencia.");

    return laptop;
}

async function findAll() {
    const laptops = await leer()

    return laptops;
}

async function create(laptop) {
    if (!laptop?.marca || !laptop?.procesador || !laptop?.ram || !laptop?.video) throw new Error("Error. Datos incompletos.");

    const laptops = await leer()
    const laptopConId = { id: generarId(laptops), ...laptop }
    laptops.push(laptopConId);
    await escribir(laptops)

    return laptopConId;
}

async function update(laptop) {
    if (!laptop?.id || !laptop?.marca || !laptop?.procesador || !laptop?.ram || !laptop?.video) throw new Error("Error. Datos incompletos.");

    const laptops = await leer();
    const indice = laptops.findIndex((element) => element.id === laptop.id);

    if (indice < 0) throw new Error("Error. El Id no corresponde a una laptop en existencia.");

    laptops[indice] = laptop;
    await escribir(laptops);

    return laptops[indice];
}

async function destroy(id) {
    if (!id) throw new Error("Error. El Id está indefinido.");

    const laptops = await leer()
    const indice = laptops.findIndex((element) => element.id === id);

    if (indice < 0) throw new Error("Error. El Id no corresponde a una laptop en existencia.");
    
    const laptop = laptops[indice];
    laptops.splice(indice, 1);
    await escribir(laptops);

    return laptop;
}

module.exports = { findOneById, findAll, create, update, destroy };