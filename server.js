const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;

var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: true
}));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//mongoose connection
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/cristal-booksSearch");
var db = mongnoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
