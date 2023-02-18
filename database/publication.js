const mongoose = require("mongoose");

// Creating a schema
const PubSchema = mongoose.Schema({
    id:Number,
    name:String,
    books: [String]
});

//creating a model
const PublicationModel = mongoose.model("publications", PubSchema);

//Exporting the model 
module.exports = PublicationModel;