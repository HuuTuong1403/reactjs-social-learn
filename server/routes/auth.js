const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");

//Register
router.post("/register", async (req, res) => {
  try {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new User with password hashed
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //Save user and send response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("Không tìm thấy email trong hệ thống");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(404).json("Thông tin tài khoản không chính xác");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
