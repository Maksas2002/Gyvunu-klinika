const mongoose = require("../db");

const GyvunasSchema = new mongoose.Schema({
    vardas: String,
    rusis: String,
    veisle: String,
    amzius: Number,
    savininkas_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Savininkas"
    }
});

module.exports = mongoose.model("Gyvunas", GyvunasSchema);