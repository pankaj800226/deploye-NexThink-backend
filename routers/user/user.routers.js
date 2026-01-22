import express from "express";
import {
  editProfile,
  forgetPassword,
  login,
  profile,
  register,
  resetPassword,
  verifyOtp,
} from "../../controllers/user/user.controllers.js";
import { userUpload } from "../../multer/user.js";
import { isAuthentication } from "../../autorized/isAuthorize.js";

const router = express.Router();
router.post("/register", userUpload.single("file"), register);
router.post("/login", login);
router.get("/profile", isAuthentication, profile);
router.put(
  "/editProfile",
  isAuthentication,
  userUpload.single("file"),
  editProfile
);
router.post("/forgot-password", forgetPassword);
router.post("/otpVerify", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
