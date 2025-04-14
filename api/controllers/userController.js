const User = require("../models/User");
const Professor = require("../models/Professor");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const createProfessorAccounts = async (req, res) => {
  try {
    const professors = await Professor.find();

    const createdUsers = [];

    for (const prof of professors) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: prof.email });
      if (existingUser) continue;

      const user = new User({
        name: prof.firstName,
        lastName: prof.lastName,
        cin: prof.cin,
        email: prof.email,
        subject: prof.subject,
        department: prof.department,
        password: prof.cin,
        role: "professor",
      });

      await user.save();
      createdUsers.push(user);

      // Send custom email
      await sendWelcomeEmail(user.email, user.name);
    }

    res.status(201).json({
      message: `${createdUsers.length} professor accounts created.`,
      users: createdUsers,
    });
  } catch (err) {
    console.error("Error creating professor accounts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendWelcomeEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "saidions15555@gmail.com",
      pass: "kquejdozrzavznor",
    },
  });

  const mailOptions = {
    from: '"IssatSo PFE" saidions15555@gmail.com',
    to: email,
    subject: "Welcome to the Platform!",
    html: `<p>Hi ${name},</p>
           <p>Your account has been created successfully. You can now log in using your CIN as your temporary password.</p>
           <p><strong>Don't forget to change your password after logging in.</strong></p>
           <p>Best regards,<br/>Admin Team</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { createProfessorAccounts };
