const express = require('express');

const userRouter = express.Router();
const userService = require('../services/userService');
const validateLogin = require('../middlewares/validateLogin');
const validateUser = require('../middlewares/validateUser');
const validateAuth = require('../middlewares/validateAuth');

userRouter.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body;
    const token = await userService.getUserByEmail(email, password);
    res.send({ token });
});

userRouter.post('/user', validateUser, async (req, res) => { 
    const token = await userService.createUser(req.body);
    res.status(201).send({ token });
});

userRouter.get('/user', validateAuth, async (_req, res) => {
    const users = await userService.getUsers();
    res.send(users);
});

userRouter.get('/user/:id', validateAuth, async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.send(user);
});

userRouter.delete('/user/me', validateAuth, async (_req, res) => {
    const { user } = res;
    await userService.deleteUser(user);
    res.status(204).send();
});

module.exports = userRouter;
