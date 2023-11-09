const { Signup, Login } = require("../Controllers/AuthController");
const {
  UserVerification,
  Passwordvalidator,
} = require("../Middlewares/AuthMiddleware");
const {
  GetUsers,
  DeleteUser,
  UpdateUsersPermission,
  ActivateUser,
} = require("../Controllers/UserController");
const router = require("express").Router();

router.post("/signup", Passwordvalidator, Signup);
router.post("/login", Login);
router.post("/", UserVerification);

router.get("/users", GetUsers);
router.delete("/users/:id", DeleteUser);
router.patch("/users/:id/permission", UpdateUsersPermission);
router.patch("/users/:id/activate", ActivateUser);

module.exports = router;
