const nodemailer = require("nodemailer");

const sendmail = async (req, res) => {
  const { firstName, lastName, email, number, subject, message } = req.body;

  try {
    // Transporter setup (using Gmail as example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "baroonshrestha4@gmail.com", // your Gmail
        pass: "oybdptwbcynqwekh", // App password (not your real Gmail password)
      },
    });

    const mailOptions = {
      from: email, // sender = the user's email from the form
      to: "baroonshrestha4@gmail.com", // receiver = your email
      subject: subject || "New Contact Form Submission",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Number: ${number}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
};

module.exports = { sendmail };
