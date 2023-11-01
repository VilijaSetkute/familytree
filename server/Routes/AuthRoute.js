const { Signup, Login } = require("../Controllers/AuthController");
const {
  UserVerification,
  Passwordvalidator,
} = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Passwordvalidator, Signup);
router.post("/login", Login);
router.post("/", UserVerification);

module.exports = router;
