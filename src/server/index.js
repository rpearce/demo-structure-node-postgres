import path from 'path';
import express from 'express';
import router from './router';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router);

export default app;
