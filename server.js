var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// // Our scraping tools
// var cheerio = require("cheerio");
// var request = require("request");

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/webscraperdb");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/itnewsdb";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//     useMongoClient: true
// });

mongoose.connect(MONGODB_URI, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("mongoose connection sucessful");
    }
});

var routes = require("./controllers/controller");

app.use(routes);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});