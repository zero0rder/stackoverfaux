import express from 'express'
import { getAllUsers, getUser, createUser, deleteUser } from '../controllers/users'

const router = express.Router()
router.get('/', getAllUsers);
router.get('/:id', getUser)
router.delete('/:id', deleteUser);
router.post('/adduser', createUser)

export default router;