require('express-async-errors');
const express = require('express');

const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(require('./routes/router'));

app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
