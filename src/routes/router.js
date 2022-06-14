const express = require('express');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const blogPostController = require('../controllers/blogPostController');
const validateAuth = require('../middlewares/validateAuth');
const validatePost = require('../middlewares/validatePost');

const routers = express.Router();

routers.use('/', userController);
routers.use('/categories', validateAuth, categoryController);
routers.use('/post', validateAuth, validatePost, blogPostController);

module.exports = routers;