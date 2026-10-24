const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", registerUser);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;