const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Ahmed:qh2$xCZxYT$6Cdr@mern-project-yyppg.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
