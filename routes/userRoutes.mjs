import { Router } from "express";
import {
  registerUser,
  getAllUser,
  loginUser,
} from "../controllers/userControllers.mjs";
import validateToken from "../middleware/validateTokenHandler.mjs";

const router = Router();

router
  .post("/register", registerUser)
  .get("/register", validateToken, getAllUser);
router.post("/login", loginUser);

router.get("/current", validateToken, getAllUser);

export default router;
