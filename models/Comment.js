var mongoose = require("mongoose");

//Save a reference to the Schema constructor 
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new comment
var CommentSchema = new Schema({
    comment: String
});

// This creates our model from the above schema
var Comment = mongoose.model("Comment", CommentSchema);

//Export the Note Model
module.exports = Comment;