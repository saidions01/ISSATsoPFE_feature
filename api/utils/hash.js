const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error("Error hashing password");
  }
};

const compare = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = {
  hashPassword,
  compare,
};
