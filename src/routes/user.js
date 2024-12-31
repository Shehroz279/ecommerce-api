const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const userController = new UserController();
router.get("/", async (req, res) => {
  userController.Index(req, res);
});
router.post("/register", async (req, res) => {
  userController.Register(req, res);
});
router.post("/login", async (req, res) => {
  userController.Login(req, res);
});

module.exports = router;
