import nodemailer from "nodemailer";

export const sendTaskEmail = async (
  userEmail,
  title,
  description,
  price,
  category,
  priority,
  status
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Task Manager App" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🎯 Your Task Has Been Created Successfully",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1)">
          
          <div style="background:#4f46e5; color:#fff; padding:20px; text-align:center">
            <h1 style="margin:0">Task Created 🎉</h1>
            <p style="margin:5px 0 0">Your task is now live</p>
          </div>

          <div style="padding:25px">
            <p style="font-size:16px">Hi 👋,</p>
            <p style="color:#444">
              Your task has been created successfully. Here are the details:
            </p>

            <table style="width:100%; border-collapse:collapse; margin-top:15px">
              <tr>
                <td style="padding:8px; color:#555"><b>Title</b></td>
                <td style="padding:8px">${title}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:8px; color:#555"><b>Description</b></td>
                <td style="padding:8px">${description}</td>
              </tr>
              <tr>
                <td style="padding:8px; color:#555"><b>Category</b></td>
                <td style="padding:8px">${category}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:8px; color:#555"><b>Priority</b></td>
                <td style="padding:8px">${priority}</td>
              </tr>
              <tr>
                <td style="padding:8px; color:#555"><b>Status</b></td>
                <td style="padding:8px">${status}</td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:8px; color:#555"><b>Price</b></td>
                <td style="padding:8px">₹ ${price || 0}</td>
              </tr>
            </table>

            <div style="text-align:center; margin:30px 0">
              <a href="#" style="background:#4f46e5; color:#fff; padding:12px 25px; border-radius:6px; text-decoration:none; font-weight:bold">
                View Your Tasks
              </a>
            </div>

            <p style="color:#666; font-size:14px">
              If you did not create this task, please contact support immediately.
            </p>
          </div>

          <div style="background:#f1f5f9; padding:12px; text-align:center; font-size:13px; color:#777">
            © ${new Date().getFullYear()} Task Manager App. All rights reserved.
          </div>

        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email Error:", error);
  }
};
