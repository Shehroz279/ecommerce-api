const express = require("express");
const router = express.Router();
const ProductController = require("../controller/product");
const { authenticateToken, isAdminRole } = require("../services/verifyToken");
const productController = new ProductController();
router.get("/", async (req, res) => {
  productController.Index(req, res);
});
router.post("/", authenticateToken, isAdminRole(true), async (req, res) => {
  productController.Create(req, res);
});
router.get("/:id", authenticateToken, isAdminRole(true), (req, res) => {
  productController.Find(req, res);
});
router.put("/:id", authenticateToken, isAdminRole(true), (req, res) => {
  productController.Update(req, res);
});
router.delete("/:id", authenticateToken, isAdminRole(true), (req, res) => {
  productController.Delete(req, res);
});
module.exports = router;
