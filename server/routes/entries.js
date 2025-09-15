// server/routes/entries.js
const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const auth = require('../middleware/auth'); // Import the auth middleware

// --- Apply the 'auth' middleware to all routes in this file ---
// This means the user must be logged in to access any of these endpoints.

// GET all entries for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    // Find entries only for the logged-in user
    const entries = await Entry.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new entry for the logged-in user
router.post('/', auth, async (req, res) => {
  const { date, content } = req.body;
  try {
    const newEntry = new Entry({
      date,
      content,
      userId: req.user.id, // Associate the entry with the user
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE an entry
router.delete('/:id', auth, async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: 'Entry not found' });
    
    // Make sure the user owns the entry
    if (entry.userId.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// PATCH (Update) an entry
router.patch('/:id', auth, async (req, res) => {
  try {
      let entry = await Entry.findById(req.params.id);
      if (!entry) return res.status(404).json({ msg: 'Entry not found' });
      
      // Make sure the user owns the entry
      if (entry.userId.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Not authorized' });
      }

      const updatedEntry = await Entry.findByIdAndUpdate(
          req.params.id,
          { content: req.body.content },
          { new: true }
      );
      res.json(updatedEntry);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;