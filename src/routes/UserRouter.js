const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);
router.get("/get-all", authMiddleware, userController.getAllUsers);
router.get(
  "/get-user-detail/:id",
  authUserMiddleware,
  userController.getUserDetail
);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
