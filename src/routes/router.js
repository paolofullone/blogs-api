const express = require('express');
const userController = require('../controllers/userController');

const routers = express.Router();

routers.use('/', userController);

module.exports = routers;