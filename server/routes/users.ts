import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  getUserDetails,
} from "../controllers/users";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/:id/detail", getUserDetails);
router.delete("/:id", deleteUser);
router.post("/adduser", createUser);

export default router;
