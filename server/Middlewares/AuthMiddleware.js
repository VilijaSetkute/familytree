const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const regexOneLowerCase = /(?=.*[a-z])/;
const regexOneUpperCase = /(?=.*[A-Z])/;
const regexOneNumber = /(?=.*[0-9])/;
const regexOneSpecialCharacter = /(?=.*[!@#\$%\^&\*])/;
const regexAtLeastCharacters = /(?=.{12,})/;

module.exports.Passwordvalidator = (req, res, next) => {
  const { password } = req.body;

  if (!regexOneLowerCase.test(password))
    return res.status(400).send({
      success: false,
      message: "Password must have at least one lowercase letter",
    });

  if (!regexOneUpperCase.test(password))
    return res.status(400).send({
      success: false,
      message: "Password must have at least one uppercase letter",
    });

  if (!regexOneNumber.test(password))
    return res.status(400).send({
      success: false,
      message: "Password must have at least one number",
    });

  if (!regexOneSpecialCharacter.test(password))
    return res.status(400).send({
      success: false,
      message: "Password must have at least one special character",
    });

  if (!regexAtLeastCharacters.test(password))
    return res.status(400).send({
      success: false,
      message: "Password must be minimum 12 symbols length",
    });

  next();
};

module.exports.UserVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        const plainUser = user.toObject();
        const { _id, ...userWithoutId } = plainUser;
        const modifiedUserSchema = _.pick(userWithoutId, [
          "userName",
          "accountPermissions",
          "accountActivated",
        ]);

        return res.json({
          status: true,
          user: { id: _id, ...modifiedUserSchema },
        });
      } else return res.json({ status: false });
    }
  });
};
