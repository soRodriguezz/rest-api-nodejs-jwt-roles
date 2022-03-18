import { Router } from "express";
const router = Router();

import * as userController from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isModerator,
    verifySignup.checkRolesExisted,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  userController.createUser
);

export default router;
