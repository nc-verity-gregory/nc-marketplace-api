const { NODE_ENV = 'dev' } = process.env;
const { rateLimit } = require('express-rate-limit');
require('dotenv').config({ path: `./${NODE_ENV}.env` });
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api.js');
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleInternalErrors,
} = require('./controllers/errors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: {
    msg: 'Received too many requests - Check your code for infinite loops!',
  },
  statusCode: 429,
  standardHeaders: 'draft-7',
});

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(limiter);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public', 'build')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'public', 'index.html'));
});

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  next({ status: 404, msg: 'Route not found' });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleInternalErrors);

module.exports = app;
