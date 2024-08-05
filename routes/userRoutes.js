const { Router } = require("express");

const {
  userSignupController,
  userSignInController,
} = require("../controllers/userControllers");

const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signup", userSignupController);

router.post("/signin", userSignInController);

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
