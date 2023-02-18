const mongoose = require("mongoose");

// creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: [Number],
});

// Model -> Document model of mongodb
const BookModel = mongoose.model(BookSchema);

module.exports = {BookModel};