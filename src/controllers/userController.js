const express = require('express');

const loginRouter = express.Router();
const userService = require('../services/userService');
const validateLogin = require('../middlewares/validateLogin');
const validateUser = require('../middlewares/validateUser');
const authenticateMiddleware = require('../middlewares/auth');

loginRouter.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body;
    const token = await userService.getUserByEmail(email, password);
    res.send({ token });
});

loginRouter.post('/user', validateUser, async (req, res) => { 
    const token = await userService.createUser(req.body);
    res.status(201).send({ token });
});

loginRouter.get('/user', authenticateMiddleware, async (req, res) => {
    const users = await userService.getUsers();
    res.send(users);
});

module.exports = loginRouter;
