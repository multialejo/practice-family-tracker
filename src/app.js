import express from 'express';
import db from './db/index.js';
import indexRoutes from './routes/index.js';
import config from '../config/index.js';
import errorHandler from './utils/error.handler.js';

const app = express();
const { port } = config;

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
