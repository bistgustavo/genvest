import express from "express";
import {
  addOrUpdateRating,
  getUserRating,
  getScriptRatings,
  deleteRating,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.route("/add-rating").post(addOrUpdateRating);

export default router;
