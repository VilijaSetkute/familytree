const UserSchema = require("../Models/UserModel");
const _ = require("lodash");

module.exports = {
  Users: async (req, res) => {
    const allUsers = await UserSchema.find();
    const mapAllUsers = allUsers.map((user) => {
      const plainUser = user.toObject();
      const { _id, ...userWithoutId } = plainUser;
      const modifiedUserSchema = _.omit(userWithoutId, ["password", "__v"]);
      return { id: _id, ...modifiedUserSchema };
    });

    if (mapAllUsers) return res.send({ data: mapAllUsers });
    res.send({ success: false, message: "No posts available" });
  },
};
