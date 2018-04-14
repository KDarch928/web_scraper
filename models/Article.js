var mongoose = require("mongoose");

//Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    //title
    title: {
        type: String,
        required: true
    }, 
    //details
    summary: {
        type: String,
        required: true 
    },
    //url
    url: {
        type: String

    },
    //comment is an object that stores a comment id
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Commment"
    }
});

//This creates our model from the above schema
var Article = mongoose.model("Article", ArticleSchema);

//Export the Article model
module.exports = Article;