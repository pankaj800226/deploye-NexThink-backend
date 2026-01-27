import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import { createProject, getProject } from "../../controllers/project_management/project.controllers.js";

const router = express.Router();

router.post('/create/project', isAuthentication, createProject)
router.get('/getProject', isAuthentication, getProject)

export default router;
