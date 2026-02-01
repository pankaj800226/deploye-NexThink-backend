import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import { createRoutine, deleteRoutine, updateRoutine } from "../../controllers/routen/routen.controllers.js";

const router = express.Router();

router.get("/createRoutine", isAuthentication, createRoutine);
router.put("/routine", isAuthentication, updateRoutine);
router.delete("/routine", isAuthentication, deleteRoutine);


export default router;
