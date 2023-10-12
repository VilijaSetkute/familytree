const { Signup, Login } = require("../Controllers/AuthController");
const { UserVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", UserVerification);

module.exports = router;
