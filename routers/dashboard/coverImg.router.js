import express from 'express'
import { isAuthentication } from '../../autorized/isAuthorize.js'
import { createCoverImg, deleteCover, findCover } from '../../controllers/dashboard/coverImg.controllers.js'
import { coverImgUpload } from '../../multer/coverImg.js'
const router = express.Router()

router.post('/cover/photo', coverImgUpload.single('file'), isAuthentication, createCoverImg)
router.get('/getImg', isAuthentication, findCover)
// router.delete('/delete/cover/:id', deleteCover)
router.delete("/delete/cover", isAuthentication, deleteCover);




export default router
