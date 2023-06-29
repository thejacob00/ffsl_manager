const express = require('express');
const roster = require('../models/roster');
const router = express.Router();

router.get('/:id', async (req, res) => {
  res.status(200).json(await roster.getRoster(req.params.id));
});

router.get('/', async (req, res) => {
  res.status(200).json(await roster.getAllRosters());
});

module.exports = router;
