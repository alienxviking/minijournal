// server/models/Entry.js
const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  // Add this userId field
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Entry', EntrySchema);