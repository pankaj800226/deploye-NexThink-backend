// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendOtpEmail = async (email, otp) => {
//   await transporter.sendMail({
//     from: `"BeeFocus" ${process.env.EMAIL_USER}`,
//     to: email,
//     subject: "🔐 Password Reset OTP",
//     html: `
//          <div style="font-family:Arial">
//         <h2>Password Reset Request</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>This OTP is valid for 10 minutes.</p>
//       </div>
//         `,
//   });
// };


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // 👈 IMPORTANT (better than host/port)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password (NO spaces)
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Verify SMTP at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP ERROR:", error);
  } else {
    console.log("✅ SMTP is ready to send emails");
  }
});

export const sendOtpEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"NexThink" <${process.env.EMAIL_USER}>`, // 👈 FIXED format
      to: email,
      subject: "🔐 Password Reset OTP",
      html: `
        <div style="font-family:Arial">
          <h2>Password Reset Request</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};