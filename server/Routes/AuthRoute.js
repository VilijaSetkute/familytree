const { Signup, Login } = require("../Controllers/AuthController");
const {
  UserVerification,
  Passwordvalidator,
} = require("../Middlewares/AuthMiddleware");
const { Users } = require("../Controllers/UserController");
const router = require("express").Router();

router.post("/signup", Passwordvalidator, Signup);
router.post("/login", Login);
router.post("/", UserVerification);

router.get("/users", Users);

module.exports = router;
