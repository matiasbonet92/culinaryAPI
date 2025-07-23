import express from 'express';
import { getUser, signupUser, signinUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get("/:id", getUser)
router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;