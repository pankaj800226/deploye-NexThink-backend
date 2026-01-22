import multer from "multer";

const storage = multer.memoryStorage()

export const coverImgUpload = multer({ storage })

