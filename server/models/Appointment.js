const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  petName: String,
  description: String,
  date: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);