
import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import { createShedular, getAllSchedulers, shedularDelete, toggleDayChecked } from "../../controllers/work_shedular/shedular.controllers.js";

const router = express.Router();

router.post('/create/shedular', isAuthentication, createShedular)
router.get('/get/shedular', isAuthentication, getAllSchedulers)
router.put('/check', isAuthentication, toggleDayChecked)
router.delete('/delete/shedular/:id', shedularDelete)


export default router;
