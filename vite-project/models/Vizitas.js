const mongoose = require("../db");

const VizitasSchema = new mongoose.Schema({
    gyvunas_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gyvunas"
    },
    data: Date,
    diagnoze: String,
    gydymas: String
});

module.exports = mongoose.model("Vizitas", VizitasSchema);