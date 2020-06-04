const { MongoClient, ObjectId } = require("mongodb");

const connectionURL =
  "mongodb+srv://Ahmed:qh2$xCZxYT$6Cdr@mern-project-yyppg.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const databaseName = "node-app";

// const id = new ObjectId();
// console.log(id, id.getTimestamp(), id.id, id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to DB");
    }

    // const db = client.db(databaseName);
  }
);
