const jwt = require("jsonwebtoken");

const secretkey = process.env.SECRET_KEY || "akubcekafvnaldca";

function createTokenForUser(user) {
  const payload = {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    profileURL: user.profileImgURL,
  };
  const token = jwt.sign(payload, secretkey, { expiresIn: "1d" });

  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secretkey);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
