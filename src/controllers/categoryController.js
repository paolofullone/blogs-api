const express = require('express');

const categoryRouter = express.Router();
const categoryService = require('../services/categoryService');
const validateAuth = require('../middlewares/validateAuth');
const validateCategory = require('../middlewares/validateCategory');

categoryRouter.get('/', validateAuth, async (_req, res) => {
    const categories = await categoryService.getCategories();
    res.send(categories);
});

categoryRouter.post('/', validateAuth, validateCategory, async (req, res) => {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res.status(201).send(category);
});

module.exports = categoryRouter;