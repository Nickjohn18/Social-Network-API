const router = require("express").Router();

const {
  getAllUsers,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserId).delete(deleteUser).put(updateUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
