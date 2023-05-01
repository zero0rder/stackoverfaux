import express from 'express';
import { getAllQuestions, getQuestion, createQuestion, deleteQuestion, getUserQuestions } from '../controllers/questions.js';
const router = express.Router();
router.get('/', getAllQuestions);
router.get('/:id', getQuestion);
router.get('/user/:id', getUserQuestions);
router.delete('/:id', deleteQuestion);
router.post('/create', createQuestion);
export default router;
//# sourceMappingURL=questions.js.map