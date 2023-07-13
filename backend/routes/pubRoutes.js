import express from "express";
import { pubFetchById } from "../controllers/pubController.js";

const router = express.Router();

router.route("/:sid").get(pubFetchById);

export default router;
