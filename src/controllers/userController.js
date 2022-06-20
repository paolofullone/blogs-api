const express = require('express');

const userRouter = express.Router();
const userService = require('../services/userService');
const validateUser = require('../middlewares/validateUser');
const validateAuth = require('../middlewares/validateAuth');

userRouter.post('/', validateUser, async (req, res) => { 
    const token = await userService.createUser(req.body);
    res.status(201).send({ token });
});

userRouter.get('/', validateAuth, async (_req, res) => {
    const users = await userService.getUsers();
    res.send(users);
});

userRouter.get('/:id', validateAuth, async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.send(user);
});

userRouter.delete('/me', validateAuth, async (_req, res) => {
    const { user } = res;
    await userService.deleteUser(user);
    res.status(204).send();
});

module.exports = userRouter;
