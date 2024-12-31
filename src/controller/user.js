const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async Index(req, res) {
    try {
      const userData = await user.find().select("-password");
      res.status(200).json({ data: userData, success: true });
    } catch (error) {
      res.status(500).json({
        status: false,
        error,
      });
    }
  }
  async Register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ status: false, message: "Invalid Request" });
        return;
      }
      const isEmailAlreadyExist = await user.findOne({ email });
      if (isEmailAlreadyExist) {
        res.status(400).json({ status: false, message: "Email Already Exist" });
        return;
      }
      const requestData = req.body;
      requestData.password = await bcrypt.hash(requestData.password, 10);
      requestData.isAdmin = false;
      console.log(requestData);
      // await user.create(requestData);
      res.status(200).json({ status: true, message: "Registration submitted" });
    } catch (error) {
      res.status(500).json({ status: false, error });
    }
  }
  async Login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ status: false, message: "Invalid Request" });
      }
      const isRecordExist = await user.findOne({ email });
      const passwordMatch = await bcrypt.compare(
        password,
        isRecordExist.password
      );
      if (!isRecordExist) {
        res.status(400).json({ status: false, message: "Email is not exist" });
        return;
      }
      if (!passwordMatch) {
        res
          .status(400)
          .json({ status: false, message: "Password is not match" });
        return;
      }
      const token = jwt.sign(
        {
          userID: isRecordExist.id,
          isAdmin: isRecordExist.isAdmin,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .json({ status: true, message: "login Successfully", token });
    } catch (error) {
      res.status(500).json({ status: true, error });
    }
  }
}
module.exports = UserController;
