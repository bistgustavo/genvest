import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  changeProfileImage
} from "../controllers/users.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshAccessToken);

//secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/change-password").patch(verifyJwt, changeCurrentPassword);
router.route("/change-profile-image").patch(verifyJwt, upload.single("profileImage"), changeProfileImage);

export default router;
