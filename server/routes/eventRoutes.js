const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE EVENT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const event = new Event({
  ...req.body,
  user: req.user.id,
});

    await event.save();

    res.json(event);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// GET ALL EVENTS
router.get("/", authMiddleware, async (req, res) => {
  try {

    const events = await Event.find({
      user: req.user.id,
    });

    res.json(events);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

// DELETE EVENT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

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
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

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