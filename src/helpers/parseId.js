module.exports = function parseId(id) {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId)) {
        throw new Error("ID inválido");
    }

    return parsedId;
};