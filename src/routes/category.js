const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/category");
const { authenticateToken, isAdminRole } = require("../services/verifyToken");
const categoryController = new CategoryController();

router.get("/", (req, res) => {
  categoryController.Index(req, res);
});
router.post("/", authenticateToken, isAdminRole(true), (req, res) => {
  categoryController.Create(req, res);
});
router.get("/:id", authenticateToken, isAdminRole(true), (req, res) => {
  categoryController.Find(req, res);
});
router.put("/:id", authenticateToken, isAdminRole(true), (req, res) => {
  categoryController.Update(req, res);
});
router.delete("/:id", authenticateToken, isAdminRole(true), (req, res) => {
  categoryController.Delete(req, res);
});

module.exports = router;
