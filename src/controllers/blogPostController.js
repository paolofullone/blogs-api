const express = require('express');

const blogPostService = require('../services/blogPostService');
const userService = require('../services/userService');
const { validatePost } = require('../middlewares/validatePost');

const blogPostRouter = express.Router();

blogPostRouter.post('/', validatePost, async (req, res) => {
    const { email } = res.user;
    const token = await userService.getUserByEmail(email);
    const newPost = await blogPostService.createBlogPost(token, req.body);
    res.status(201).send(newPost);
});

blogPostRouter.get('/', async (req, res) => {
    const posts = await blogPostService.getAllBlogPosts();
    res.status(200).send(posts);
});

blogPostRouter.get('/search', async (req, res) => {
    const { q } = req.query;
    const posts = await blogPostService.getBlogPostsBySearch(q);
    res.status(200).send(Object.values(posts));
});

blogPostRouter.get('/:id', async (req, res) => {
    const post = await blogPostService.getBlogPostById(req.params.id);
    res.status(200).send(post);
});

blogPostRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = res.user;
    const updatedPost = await blogPostService.updateBlogPost(email, id, req.body);
    res.status(200).send(updatedPost);
});

blogPostRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = res.user;
    await blogPostService.deleteBlogPost(email, id);
    res.status(204).send();
});

module.exports = blogPostRouter;