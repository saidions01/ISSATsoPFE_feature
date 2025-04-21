const mongoose = require("mongoose");
const User = require("../models/User");

const MONGO_URI = "mongodb://127.0.0.1:27017/studentUploaderDB";

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "saidions15555@gmail.com",
    });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists.");
      return process.exit();
    }

    const adminUser = new User({
      email: "saidions15555@gmail.com",
      password: "admin123",
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
};

seedAdmin();
