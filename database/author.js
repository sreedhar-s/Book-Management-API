const mongoose = require("mongoose");

//Creating a author Schema
const AuthorSchema = mongoose.Schema({
    Id: Number,
    name:String,
    books: [String]
});

//creating a model
const AuthorModel = mongoose.model(AuthorSchema);

//Exporting the model
module.exports = {AuthorModel};