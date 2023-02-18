require("dotenv").config();

//Frame Work
const express = require("express");
const mongoose = require("mongoose");

// Models
const {BookModel} = require("./database/book");
const {AuthorModel} = require("./database/author");
const {PublicationModel} = require("./database/publication");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

//IniTilaization
const api = express();

// Use the express
api.use(express.json());

// Establish the connnection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection established!!!!"));

//Microservices
api.use("/book", Books);
api.use("/author", Authors);
api.use("/pub", Publications);

api.listen(5000, () => console.log("Server is running!!!!"));