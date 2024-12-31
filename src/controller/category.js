const category = require("../models/category");
const mongoose = require("mongoose");
class CategoryController {
  async Index(req, res) {
    await category
      .find()
      .then((result) => {
        res.status(200).json({ data: result, success: true });
      })
      .catch((error) => {
        res.status(500).json({
          error,
          status: false,
        });
      });
  }
  async Create(req, res) {
    const { name, color, icon, image } = req.body;
    if (!name) {
      res.status(400).json({ message: "Invalid Request" });
      return;
    }
    await category.findOne({ name }).then(async (result) => {
      if (result) {
        res
          .status(400)
          .json({ success: false, message: "This Category Already Created" });
      } else {
        await category
          .create(req.body)
          .then(() => {
            res
              .status(200)
              .json({ success: true, message: "Category Create Successfully" });
          })
          .catch((error) => {
            res.status(500).json({ success: false, error });
          });
      }
    });
  }
  async Find(req, res) {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ success: false, message: "ID is not Valid" });
      return;
    }
    await category
      .findById(id)
      .then((result) => {
        if (result) {
          res.status(200).json({ success: true, data: result });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Catgory Not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error });
      });
  }
  async Update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ success: false, message: "ID is not Valid" });
      return;
    }
    if (!name) {
      res.status(400).json({ success: false, message: "Invalid Requuest" });
      return;
    }
    const existingProduct = await category.findOne({
      name: name,
      _id: { $ne: id }, // Exclude the current product from the check
    });
    if (existingProduct) {
      res
        .status(400)
        .json({ success: false, message: "This name Already Exist" });
      return;
    }
    const filter = { _id: id };
    await category
      .findOneAndUpdate(
        filter,
        req.body,
        { new: true } // Return the updated document
      )
      .then((result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: "Category Update Successfully",
            result,
          });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Category Not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error });
      });
    // await category.
  }
  async Delete(req, res) {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ success: false, message: "ID is not Valid" });
      return;
    }
    const filter = { _id: id };
    await category
      .findOneAndDelete(filter)
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ success: true, message: "Category Deleted Successfully" });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Category Not found", result });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error });
      });
  }
}
module.exports = CategoryController;
