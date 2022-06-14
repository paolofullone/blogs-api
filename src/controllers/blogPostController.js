const express = require('express');

const blogPostService = require('../services/blogPostService');
const userService = require('../services/userService');
const validatePost = require('../middlewares/validatePost');

const blogPostRouter = express.Router();

blogPostRouter.post('/', validatePost, async (req, res) => {
    const { email, password } = res.user;
    const user = await userService.getUserByEmail(email, password);
    const newPost = await blogPostService.createBlogPost(user, req.body);
    res.status(201).send(newPost);
});

blogPostRouter.get('/', async (req, res) => {
    const posts = await blogPostService.getAllBlogPosts();
    res.status(200).send(posts);
});

module.exports = blogPostRouter;