import express from "express";
import {
  getAllQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
} from "../controllers/questions";

const router = express.Router();
router.get("/", getAllQuestions);
router.get("/:id", getQuestion);
router.delete("/:id", deleteQuestion);
router.post("/create", createQuestion);

export default router;
