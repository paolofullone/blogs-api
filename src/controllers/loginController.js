const express = require('express');

const loginRouter = express.Router();
const loginService = require('../services/loginService');

loginRouter.post('/', async (req, res) => {
    console.log('entrou na post login  ');
    const { email, password } = req.body;
    const token = await loginService.getUserByEmail(email, password);
    res.send({ token });
});

module.exports = loginRouter;