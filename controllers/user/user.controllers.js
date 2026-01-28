import { User } from "../../model/user/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../../utils/cloudnary.js";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../../emails/sendOtpEmail.js";

// register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadAvatar = cloudinary.uploader.upload_stream(
      {
        folder: "user_avatar",
      },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Cloudnary uplod failed" });
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
          return res.send({ code: 401, message: "User Alredy exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User({
          username,
          email,
          password: hashPassword,
          avatar: result.secure_url,
        });

        await newUser.save();
        return res.send({ code: 200, message: "register sucessfull" });
      }
    );

    uploadAvatar.end(req.file.buffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ code: "404", message: "User Not Found" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.send({ code: 405, message: "Password invilid" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });

    res.send({
      userId: user._id,
      username: user.username,
      email: user.email,
      token,
      code: 200,
      message: "Login sucessfull",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server Error" });
  }
};

// profile
export const profile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.send({ code: 404, message: "User Not Found" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const editProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // text update
    if (username) user.username = username;
    if (email) user.email = email;

    // avatar update (only if file uploaded)
    if (req.file) {
      const uploadAvatar = cloudinary.uploader.upload_stream(
        { folder: "user_avatar" },
        async (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Avatar upload failed" });
          }

          user.avatar = result.secure_url;
          await user.save();

          res.status(200).json(user);
        }
      );

      uploadAvatar.end(req.file.buffer);
    } else {
      // only text updated
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// forgate password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    if (user?.email) {
      setImmediate(async () => {
        try {
          await sendOtpEmail(user.email, otp);
        } catch (error) {
          await sendOtpEmail(user.email, otp);
        }
      });
    }

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, otp });

    if (!user || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
