const UserSchema = require("../Models/UserModel");
const _ = require("lodash");

module.exports = {
  GetUsers: async (req, res) => {
    const allUsers = await UserSchema.find();
    const mapAllUsers = allUsers.map((user) => {
      const plainUser = user.toObject();
      const { _id, ...userWithoutId } = plainUser;
      const modifiedUserSchema = _.omit(userWithoutId, ["password", "__v"]);
      return { id: _id, ...modifiedUserSchema };
    });

    if (mapAllUsers) return res.send({ data: mapAllUsers });
    res.send({ success: false, message: "No users found" });
  },
  DeleteUser: async (req, res) => {
    const { id } = req.params;
    await UserSchema.findOneAndDelete({ _id: id });
    res.send({ success: true, message: "User deleted successfully" });
  },
  UpdateUsersPermission: async (req, res) => {
    const { id } = req.params;
    const { accountPermissions } = req.body;
    await UserSchema.findOneAndUpdate(
      { _id: id },
      { $set: { accountPermissions } }
    );
    res.send({
      success: true,
      message: "User's permissions updated successfully",
    });
  },
  ActivateUser: async (req, res) => {
    const { id } = req.params;
    const user = await UserSchema.findOne({ _id: id });
    const { accountActivated } = user;
    await UserSchema.findOneAndUpdate(
      { _id: id },
      { $set: { accountActivated: !accountActivated } }
    );
    res.send({ success: true, message: "User activated" });
  },
};
