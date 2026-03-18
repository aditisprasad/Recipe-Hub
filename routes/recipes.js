const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Get all recipes (with search functionality)
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const recipes = await Recipe.find(query)
            .populate('createdBy', 'username')
            .sort({ createdAt: -1 });

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single recipe
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const recipe = await Recipe.findById(req.params.id)
            .populate('createdBy', 'username');

        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new recipe
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, ingredients, instructions, imageUrl } = req.body;

        const newRecipe = await Recipe.create({
            title,
            description,
            ingredients,
            instructions,
            imageUrl,
            createdBy: req.user.id
        });

        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a recipe
router.put('/:id', auth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

        if (recipe.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized to update this recipe' });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a recipe
router.delete('/:id', auth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

        if (recipe.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized to delete this recipe' });
        }

        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: 'Recipe removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
