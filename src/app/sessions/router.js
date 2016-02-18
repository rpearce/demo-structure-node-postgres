import express from 'express';
import mandrill from 'mandrill-api/mandrill';
import postSignIn from './routes/postSignIn';
import getSession from './routes/getSession';

const router = express.Router();

router.post('/signin', postSignIn);
router.get('/session', getSession);

export default router;
