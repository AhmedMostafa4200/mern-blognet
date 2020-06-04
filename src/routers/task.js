const express = require("express");

const url = require("url");
const querystring = require("querystring");

var ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const Task = require("../models/task");
const User = require("../models/user");

const router = new express.Router();

//2-1 Create a task
router.post(
  "/tasks/newtask",
  [auth, upload.single("image")],
  async (req, res) => {
    const blog = JSON.parse(req.body.blog);
    const owner = await User.findById(blog.owner);
    const task = new Task({
      title: blog.title,
      body: blog.body,
      tags: blog.tags,
      image: req.file.buffer,
      owner: owner._id,
    });

    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(500).send();
    }
  }
);

//2-2 Get all tasks & pagination
router.get("/tasks", async (req, res) => {
  try {
    let urlParser = url.parse(req.url);
    let querystringParser = querystring.parse(urlParser.query); //
    const tasks = await Task.find().sort({ date: -1 });
    const paginatedTasks = tasks.slice(
      +querystringParser.start,
      +querystringParser.size
    );
    res.send(paginatedTasks);
  } catch (e) {
    res.send(e);
  }
});

//2-3 Get any specific task
router.get("/tasks/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(404).send("Invalid ID");
    }
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      res.status(404).send("No available Blog!");
    }
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//2-4 Update a task
router.patch("/tasks/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID");
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "body", "tags", "image"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(401).send("Error : invalid Update");
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send("No available Blog!");
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//2-5 Delete a task
router.delete("/deleteTask/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID");
  }
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send("No available Blog!");
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//2-6 Get all tasks for a specific user
router.get("/tasks/:user/:userid", async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.params.userid }).sort({
      date: -1,
    });
    if (!tasks) {
      res.status(404).send("No Blogs");
    }
    res.status(201).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//2-7 Search by: blogTitle or user or tag
router.get("/search", auth, async (req, res) => {
  try {
    let urlParser = url.parse(req.url);
    let querystringParser = querystring.parse(urlParser.query);
    if (querystringParser.searchby === "blog") {
      const tasks = await Task.find({
        title: new RegExp(querystringParser.value, "i"),
      });
      res.status(201).send(tasks);
    } else if (querystringParser.searchby === "user") {
      const users = await User.find({
        name: new RegExp(querystringParser.value, "i"),
      });
      var tasks = [];
      for (let index = 0; index < users.length; index++) {
        tasks = tasks.concat(await Task.find({ owner: users[index]._id }));
      }
      res.status(201).send(tasks);
    } else if (querystringParser.searchby === "tag") {
      const tasks = await Task.find({
        tags: new RegExp(querystringParser.value, "i"),
      });
      res.status(201).send(tasks);
    }
  } catch (e) {
    res.status(500).send();
  }
});

//2-8 Get tasks that the author follow (home)
router.get("/home", auth, async (req, res) => {
  try {
    const followedTasks = await Task.find({ owner: req.user.followers });
    if (!followedTasks) {
      followedTasks = [];
    }
    let myTasks = await Task.find({ owner: req.user._id });
    if (!myTasks) {
      myTasks = [];
    }
    const tasks = [...followedTasks, ...myTasks];

    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

/////////////////////////////
///////////////////////////
/////////////////////////

// READ
// GET /tasks?completed=true
// GET /tasks?limit=2&skip=2
// GET /tasks?sortBy=createdAt:asc
// router.get("/tasks", auth, async (req, res) => {
//   try {
//     //const tasks = await Task.find({});
//     //const tasks = await Task.find({ owner: req.user._id });
//     const match = {};
//     const sort = {};

//     if (req.query.completed) {
//       match.completed = req.query.completed === "true";
//     }

//     if (req.query.sortBy) {
//       const parts = req.query.sortBy.split(":");
//       sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
//     }

//     await req.user
//       .populate({
//         path: "tasks",
//         match,
//         options: {
//           limit: parseInt(req.query.limit),
//           skip: parseInt(req.query.skip),
//           sort,
//         },
//       })
//       .execPopulate();
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

module.exports = router;
