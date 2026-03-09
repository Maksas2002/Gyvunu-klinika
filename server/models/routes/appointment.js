const router = require("express").Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  const appointment = await Appointment.create({
    ...req.body,
    owner: req.user.id
  });
  res.json(appointment);
});

// READ + SEARCH + SORT
router.get("/", auth, async (req, res) => {
  const { search, sort } = req.query;

  let query = {};
  if (req.user.role === "patient")
    query.owner = req.user.id;

  if (search)
    query.petName = { $regex: search, $options: "i" };

  const appointments = await Appointment.find(query)
    .sort(sort === "date" ? { date: 1 } : { createdAt: -1 });

  res.json(appointments);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// APPROVE (admin)
router.put("/approve/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json("Forbidden");

  const approved = await Appointment.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true }
  );

  res.json(approved);
});

// DELETE (admin)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json("Forbidden");

  await Appointment.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;