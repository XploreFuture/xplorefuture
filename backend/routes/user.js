const express = require("express");
const verifySession = require("../middlewares/verifySession");
const router = express.Router();
const User = require("../models/User");


router.get("/profile", verifySession, async (req, res) => {
  const user = await User.findOne({ uid: req.uid });
  if (!user) return res.status(404).send("User not found");

  res.json({
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    gender: user.gender,
    insta: user.insta || "",
    website: user.website || "",
    youtube: user.youtube || "",
    avatar: user.avatar || "",
  });
});
// Example Express route
router.put("/profile/update", verifySession, async (req, res) => {
  const { insta, website, youtube,avatar } = req.body;
  const userId = req.user.id; // Assuming you're using middleware to extract `user`

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { insta, website, youtube,avatar },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});



module.exports = router;
