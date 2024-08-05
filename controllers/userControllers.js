const User = require("../models/user");
const { createTokenForUser } = require("../services/auth");

async function userSignupController(req, res) {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      fullName,
      email,
      password,
    });

    res.redirect("/");
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
}

async function userSignInController(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("signin", {
        error: `User doesn't exist with this email : ${email}`,
      });
    }

    if (!user.comparePassword(password)) {
      return res.render("signin", { error: "Incorrect Password" });
    }

    // generate token
    const token = createTokenForUser(user);

    res.cookie("token", token, { httpOnly: true }).redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", error: error });
  }
}

module.exports = { userSignupController, userSignInController };
