import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import {
  createTodo,
  deleteTask,
  getTask,
  taskId,
  updateTask,
} from "../../controllers/todo/todo.controllers.js";
const router = express.Router();

router.post("/createTodo", isAuthentication, createTodo);
router.get("/getTask", isAuthentication, getTask);
router.delete("/deleteTask/:id", deleteTask);
router.get("/getTaskId/:id", taskId);
// router.put("/taskStatus/:id", statusChange);
router.put("/editTodo/:id", updateTask);

export default router;
