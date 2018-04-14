var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Configure middleware

// // Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/webscraperdb");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

var routes = require("./controllers/controller");

app.use(routes);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

// app.get("/scrape", function (req, res) {
//     // First, we grab the body of the html with request
//     request("https://www.itworld.com/news/", function (err, response, html) {
//         // Then, we load that into cheerio and save it to $ for a shorthand selector
//         var $ = cheerio.load(html);

//         // Now, we grab every h2 within an article tag, and do the following:
//         $(".post-cont").each(function (i, element) {
//             // Save an empty result object
//             var result = {};
//             var wiredUrl = "https://www.itworld.com";

//             // Add the text and href of every link, and save them as properties of the result object
//             // result.title = $(this)
//             //   .children("a")
//             //   .text();
//             // result.link = $(this)
//             //   .children("a")
//             //   .attr("href");

//             result.title = $(this).children("h3").text();
//             result.summary = $(this).children("h4").text();
//             wiredUrl += $(this).children("h3").find("a").attr("href");
//             result.url = wiredUrl;

//             // Create a new Article using the `result` object built from scraping
//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     // View the added result in the console
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     // If an error occurred, send it to the client
//                     return res.json(err);
//                 });
//         });

//         // If we were able to successfully scrape and save an Article, send a message to the client
//         res.send("Scrape Complete");
//     });
// });