const express = require('express');
const router = express.Router();
const Agro = require('../models/Agro');
const mongoose = require('mongoose');

// GET agro entries, optionally filtered by userId
router.post('/', async (req, res) => {
    const { userId } = req.body;
    const filter = userId ? { userId } : {};
    try {
        const agroEntries = await Agro.find(filter).sort({ harvestDate: -1 });
        res.status(200).json(agroEntries);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// POST a new agro entry -> Create
router.post('/add', async (req, res) => {
    const { userId, Name, Email, cropType, quantity, location, harvestDate } = req.body;
    if (!userId || !Name || !Email || !cropType || !quantity || !location || !harvestDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newAgro = new Agro({ userId, Name, Email, cropType, quantity, location, harvestDate });
        const savedAgro = await newAgro.save();
        res.status(201).json(savedAgro);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

//PUT update an existing agro entry -> Update
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, Name, Email, cropType, quantity, location, harvestDate } = req.body;


    const updated = await Agro.findByIdAndUpdate(
        id,
        { $set: { userId, Name, Email, cropType, quantity, location, harvestDate } },
        { new: true }
    );

    if (!updated) {
        return res.status(404).json({ message: 'Agro entry not found' });
    }
    res.status(200).json(updated);
});

// DELETE an agro entry -> Delete
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Agro.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Agro entry not found' });
        }
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
