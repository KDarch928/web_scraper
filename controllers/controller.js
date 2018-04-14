var express = require("express");

var router = express.Router();
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");


// Require all models
var db = require("../models/index");

// Routing



router.get("/", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            return res.render("index",{articles: dbArticle});
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});
// A GET route for scraping the echoJS website
router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    request("https://www.itworld.com/news/", function (err, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".post-cont").each(function (i, element) {
            // Save an empty result object
            var result = {};
            var wiredUrl = "https://www.itworld.com";

            // Add the text and href of every link, and save them as properties of the result object
            // result.title = $(this)
            //   .children("a")
            //   .text();
            // result.link = $(this)
            //   .children("a")
            //   .attr("href");

            result.title = $(this).children("h3").text();
            result.summary = $(this).children("h4").text();
            wiredUrl += $(this).children("h3").find("a").attr("href");
            result.url = wiredUrl;

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                    // res.redirect("/");
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        // res.send("Scrape Complete");
        res.redirect("/");
    });
});


// Route for getting all Articles from the db
router.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({
            _id: req.params.id
        })
        // ..and populate all of the notes associated with it
        .populate("comment")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});



module.exports = router;