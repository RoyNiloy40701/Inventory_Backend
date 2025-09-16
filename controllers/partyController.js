//partyController.js
const Party = require('../models/Party');
const mongoose = require('mongoose');

exports.getAllParties = async (req, res) => {
  try {
    const parties = await Party.find().sort({ regdate: -1 });
    res.status(200).json(parties);
  } catch (err) {
    console.error('Error fetching parties:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.addParty = async (req, res) => {
  try {
    // Accept regdate and update from frontend, or set defaults
    const { regdate, update, ...partyData } = req.body;

    partyData.regdate = regdate ? new Date(regdate) : new Date();
    partyData.update = update ? new Date(update) : new Date();

    const newParty = new Party(partyData);
    await newParty.save();
    res.status(201).json(newParty);
  } catch (err) {
    console.error('Error adding party:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getPartyById = async (req, res) => {
  const partyId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(partyId)) {
      return res.status(400).json({ error: 'Invalid party ID format' });
    }

    const party = await Party.findById(partyId);

    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json(party);
  } catch (err) {
    console.error('Error fetching party by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateParty = async (req, res) => {
  const partyId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(partyId)) {
      return res.status(400).json({ error: 'Invalid party ID format' });
    }

    const updatedParty = await Party.findByIdAndUpdate(
      partyId,
      { ...req.body, update: new Date() }, // update the 'update' field
      { new: true, runValidators: true }
    );

    if (!updatedParty) {
      return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json(updatedParty);
  } catch (err) {
    console.error('Error updating party:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteParty = async (req, res) => {
  const partyId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(partyId)) {
      return res.status(400).json({ error: 'Invalid party ID format' });
    }

    const deletedParty = await Party.findByIdAndDelete(partyId);

    if (!deletedParty) {
      return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json({ message: 'Party deleted successfully' });
  } catch (err) {
    console.error('Error deleting party:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
