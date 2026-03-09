const mongoose = require("../../server/db");

const SavininkasSchema = new mongoose.Schema({
    vardas: String,
    telefonas: String,
    el_pastas: String
});

module.exports = mongoose.model("Savininkas", SavininkasSchema);