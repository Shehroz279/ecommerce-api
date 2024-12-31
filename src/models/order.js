const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "orderItem",
    },
  ],
  shippingAddress1: {
    type: String,
    required: false,
    default: "",
  },

  shippingAddress2: {
    type: String,
    required: false,
    default: "",
  },
  city: {
    type: String,
    required: false,
    default: "",
  },
  zip: {
    type: String,
    required: false,
    default: "",
  },
  country: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: "",
  },
  totalPrice: {
    type: Number,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  dateOrdered: {
    type: Date,
    default: Date.now(),
  },
});
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", { virtuals: true });

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
