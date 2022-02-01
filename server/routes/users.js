const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Thông tin tài khoản đã được cập nhật");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn chỉ có thể cập nhật tài khoản của bạn");
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa tài khoản thành công");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn chỉ có thể xóa tài khoản của bạn");
  }
});

//Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId))
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Follow User
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("Bạn đã theo dõi người dùng");
      } else {
        res.status(403).json("Bạn đã theo dõi người dùng này");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn không thể theo dõi chính bạn");
  }
});

//Unfollow User
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("Bạn đã hủy theo dõi người dùng");
      } else {
        res.status(403).json("Bạn không theo dõi người dùng này");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn không thể hủy theo dõi chính bạn");
  }
});

module.exports = router;
