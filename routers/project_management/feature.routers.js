import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import { createFeature, editFeature, featureDelete, getFeature, getFeatureById } from "../../controllers/project_management/feature.controllers.js";

const router = express.Router();

router.post('/create/feature/:projectId', isAuthentication, createFeature)
router.get('/get/feature/:projectId',getFeature)
router.delete('/delete/feature/:id',featureDelete)
router.get('/featureId/:id',getFeatureById)
router.put('/edit/feature/:id',editFeature)

export default router;
