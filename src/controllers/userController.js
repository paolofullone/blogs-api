const express = require('express');

const loginRouter = express.Router();
const loginService = require('../services/userService');
const validateLogin = require('../middlewares/validateLogin');
const validateUser = require('../middlewares/validateUser');

loginRouter.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body;
    const token = await loginService.getUserByEmail(email, password);
    res.send({ token });
});

loginRouter.post('/user', validateUser, async (req, res) => { 
    const token = await loginService.createUser(req.body);
    res.status(201).send({ token });
});

module.exports = loginRouter;
