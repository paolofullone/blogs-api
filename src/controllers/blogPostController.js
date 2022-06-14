const express = require('express');

const blogPostService = require('../services/blogPostService');
const userService = require('../services/userService');

const blogPostRouter = express.Router();

blogPostRouter.post('/', async (req, res) => {
    const { email, password } = res.user;
    const user = await userService.getUserByEmail(email, password);
    const newPost = await blogPostService.createBlogPost(user, req.body);
    res.status(201).send(newPost);
});

module.exports = blogPostRouter;