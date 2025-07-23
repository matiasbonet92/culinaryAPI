import express from 'express';
import { createUser, getUser } from '../controllers/users.js';

const router = express.Router();

router.get("/", getUser)
router.post('/signin', createUser);

export default router;