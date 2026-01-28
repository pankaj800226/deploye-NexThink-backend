import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import { createProject, editProject, getProject, projectDelete, projectId } from "../../controllers/project_management/project.controllers.js";

const router = express.Router();

router.post('/create/project', isAuthentication, createProject)
router.get('/getProject', isAuthentication, getProject)
router.get('/projectId/:id', projectId)
router.put('/edit/project/:id',editProject)
router.delete('/project/delete/:id', projectDelete)

export default router;
