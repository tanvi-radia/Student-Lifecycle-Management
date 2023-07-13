import express from "express";
import { evalAch, getAchList, getUsers } from "../controllers/admController.js";

const router = express.Router();

router.route("/pendingusers").get(getUsers);
router.route("/ach/:sid").get(getAchList);
router.route("/eval/:id").put(evalAch);
export default router;
