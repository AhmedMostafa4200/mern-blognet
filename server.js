const express = require("express");
const cors = require("cors");
require("./src/db/mongoose");
const path = require("path");
const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");

const app = express();
const port = process.env.PORT || 2020;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

// Serve static assets to production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("App is running on port ", port);
});
