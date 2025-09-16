const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new player
router.post('/', async (req, res) => {
  try {
    const { name, role, matches, runs, wickets } = req.body;
    
    const player = new Player({
      name,
      role,
      matches: matches || 0,
      runs: runs || 0,
      wickets: wickets || 0
    });
    
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;