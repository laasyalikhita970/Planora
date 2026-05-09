const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// CREATE EVENT
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);

    await event.save();

    res.json(event);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// GET ALL EVENTS
router.get("/", async (req, res) => {
  try {

    const events = await Event.find();

    res.json(events);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// DELETE EVENT
router.delete("/:id", async (req, res) => {
  try {

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// UPDATE EVENT
router.put("/:id", async (req, res) => {
  try {

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;