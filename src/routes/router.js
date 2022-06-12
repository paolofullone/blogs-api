const express = require('express');
const loginController = require('../controllers/loginController');

const validateLogin = require('../middlewares/login');

const routers = express.Router();

routers.use('/login', validateLogin, loginController);

module.exports = routers;