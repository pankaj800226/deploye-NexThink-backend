import express from 'express';
import { createFeedback, deleteFeedback, getFeedbacks } from '../../controllers/feedback/feedback.controllers.js';
import { isAuthentication } from '../../autorized/isAuthorize.js'
const router = express.Router();

router.post('/create/feedback', isAuthentication, createFeedback);
router.get('/get/feedbacks', getFeedbacks);
router.delete('/delete/feedback/:id', isAuthentication, deleteFeedback);

export default router;