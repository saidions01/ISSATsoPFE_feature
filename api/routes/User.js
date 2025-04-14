const express = require("express");
const router = express.Router();
const { createProfessorAccounts } = require("../controllers/userController");

router.post("/create-professor-accounts", createProfessorAccounts);

module.exports = router;
