const mongoose = require("mongoose");

// Creating a schema
const PubSchema = mongoose.Schema({
    id:Number,
    name:String,
    books: [String]
});

//creating a model
const PubModel = mongoose.model(PubSchema);

//Exporting the model 
module.exports = {PubModel};