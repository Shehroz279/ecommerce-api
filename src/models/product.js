const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    reqired: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  richDescription: {
    type: String,
    required: false,
    default: "",
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
  images: {
    type: Array,
    required: false,
    default: [],
  },
  brand: {
    type: String,
    required: false,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  isFeatured: {
    type: Boolean,
    required: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("product", productSchema);

module.exports = Product;
