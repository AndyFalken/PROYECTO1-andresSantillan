async function findOneById(id) {
    return {id};
}

async function findAll() {
    return [];
}

async function create(laptop) {
    return laptop;
}

async function update(laptop) {
    return laptop;
}

async function destroy(id) {
    return id;
}

module.exports = { findOneById, findAll, create, update, destroy };