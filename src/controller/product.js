const product = require("../models/product");
const mongoose = require("mongoose");
class ProductController {
  async Index(req, res) {
    await product
      .find()
      .populate("category")
      .then((result) => {
        res.status(200).send({ data: result, success: true });
      })
      .catch((error) => {
        res.status(500).send({ error, success: false });
      });
  }
  async Create(req, res) {
    const {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      isFeatured,
    } = req.body;
    if (!name || !price || !countInStock) {
      res.status(400).json({ message: "Invalid Request" });
      return;
    }
    await product
      .findOne({ name })
      .then(async (result) => {
        console.log(result);
        if (result) {
          res
            .status(400)
            .send({ message: "Duplicate Name Not Allowed", success: false });
        } else {
          await product
            .create(req.body)
            .then((result) => {
              res
                .status(200)
                .send({ message: "Product Created", success: true });
            })
            .catch((error) => {
              res.status(500).send({ error: error, success: false });
            });
        }
      })
      .catch((error) => {
        res.status(500).send({ error: error, success: false });
      });
  }
  async Find(req, res) {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ success: false, message: "ID is not Valid" });
      return;
    }
    await product
      .findById(id)
      .then((result) => {
        if (result) {
          res.status(200).json({ success: true, data: result });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Product Not found" });
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
    const existingProduct = await product.findOne({
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
    await product
      .findOneAndUpdate(
        filter,
        req.body,
        { new: true } // Return the updated document
      )
      .then((result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: "Product Update Successfully",
            result,
          });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Product Not found" });
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
    await product
      .findOneAndDelete(filter)
      .then((result) => {
        if (result) {
          res
            .status(200)
            .json({ success: true, message: "Product Deleted Successfully" });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Product Not found", result });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error });
      });
  }
}

module.exports = ProductController;
