const order = require("../models/order");
class OrderController {
  async Index(req, res) {
    await order
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
}
module.exports = OrderController;
