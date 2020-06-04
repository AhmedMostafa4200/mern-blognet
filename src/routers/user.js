const express = require("express");
var ObjectId = require("mongoose").Types.ObjectId;

const url = require("url");
const querystring = require("querystring");

const User = require("../models/user");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = new express.Router();

// 1- CREATE
router.post("/signup", upload.single("image"), async (req, res) => {
  const newUser = JSON.parse(req.body.user);
  const user = new User({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    image: req.file.buffer,
  });
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// 2- Authenticate
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// 3- Get me
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// 4- Get specific user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// 5- DELETE
router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// 6- UPDATE
// router.patch("/user/me", [auth, upload.single("image")], async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "password", "image"];
//   const isValidUpdate = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidUpdate) {
//     return res.status(404).send("Error : Invalid updates");
//   }
//   const buffer = await sharp(req.file.buffer)
//     .resize({ width: 1000, height: 500 })
//     .png()
//     .toBuffer();
//   try {
//     updates.forEach((update) => (req.user[update] = req.body[update]));
//     req.user.image = buffer;
//     await req.user.save();
//     res.send(req.user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// 7- User logout
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// 8- User logout from all accounts
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user.tokens);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//2-9 Follow user
router.post("/follow", auth, async (req, res) => {
  try {
    let urlParser = url.parse(req.url);
    let querystringParser = querystring.parse(urlParser.query);
    let user = await User.findOne({ _id: req.user._id });
    if (querystringParser.isFollowed == "true") {
      user.followers = user.followers.concat(querystringParser.otherUserId);
      // user.followers.push(querystringParser.otherUserId);
    } else if (querystringParser.isFollowed == "false") {
      user.followers = user.followers.filter(
        (el) => el._id != querystringParser.otherUserId
      );
    }
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
