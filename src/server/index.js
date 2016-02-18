import 'babel-polyfill';
import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import router from './router';
import sessionsRouter from '../app/sessions/router';

dotenv.load();

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_KEY_BASE
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(sessionsRouter);
app.use(router);

export default app;
