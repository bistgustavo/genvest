import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createScript,
  deleteScript,
  getAllScripts,
  getMyScripts,
  getScriptById,
  updateScript,
} from "../controllers/script.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/create-script")
  .post(verifyJwt, upload.single("image"), createScript);

router.route("/get-all-scripts").get(getAllScripts);
router.route("/get-my-scripts").get(verifyJwt, getMyScripts);

router.route("/get-scripts-by-id/:id").get(verifyJwt, getScriptById);

router
  .route("/update-script/:id")
  .patch(verifyJwt, upload?.single("image"), updateScript);

router.route("/deleteScript/:id").delete(verifyJwt, deleteScript);

export default router;
