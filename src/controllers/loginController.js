const express = require('express');

const loginRouter = express.Router();
const userService = require('../services/userService');
const validateLogin = require('../middlewares/validateLogin');

loginRouter.post('/', validateLogin, async (req, res) => {
    const { email, password } = req.body;
    const token = await userService.getUserByEmail(email, password);
    res.send({ token });
});

module.exports = loginRouter;
