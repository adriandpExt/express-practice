import { Router } from "express";
const router = Router();
import {
  getAllTodo,
  postTodo,
  putTodo,
  deleteTodo,
} from "../controllers/todoControllers.mjs";
import validateToken from "../middleware/validateTokenHandler.mjs";

router.use(validateToken);
router.route("/").get(getAllTodo).post(postTodo);
router.route("/:id").put(putTodo).delete(deleteTodo);

export default router;
