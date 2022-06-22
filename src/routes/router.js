const express = require('express');
const userController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const blogPostController = require('../controllers/blogPostController');
const loginController = require('../controllers/loginController');
const validateAuth = require('../middlewares/validateAuth');

const routers = express.Router();

routers.use('/login', loginController);
routers.use('/user', userController);
routers.use('/categories', validateAuth, categoryController);
routers.use('/post', validateAuth, blogPostController);

module.exports = routers;