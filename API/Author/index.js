const Router = require("express").Router();

const AuthorModel = require("../../database/author");

/* 
Route : 
Description : To get all the authors
access : public
params : None
Method : get
*/

Router.get("", async (req, res) => {
  const getAllBooks = await AuthorModel.find();

  return res.json({ authors: getAllBooks });
});

/* 
Route : 
Description : To get specefic author based on id
access : public
params : id
Method : get
*/

Router.get("/i/:id", async (req, res) => {
  const getSpeceficAuthors = await AuthorModel.findOne({ Id: req.params.id });

  // const getAuthor = database.authors.filter(
  //   (author) => author.Id === parseInt(req.params.id)
  // );

  if (!getSpeceficAuthors) {
    return res.json({ error: `No author found for the id ${req.params.id}` });
  }

  return res.json({ Authors: getSpeceficAuthors });
});

/* 
Route : /is
Description : To get specefic author based on a book
access : public
params : ISBN
Method : get
*/

Router.get("/is/:isbn", async (req, res) => {
  const getSpeceficAuthors = await AuthorModel.find({ books: req.params.isbn });

  // const getSpeceficAuthors = database.authors.filter((author) =>
  //   author.books.includes(req.params.isbn)
  // );

  if (!getSpeceficAuthors) {
    return res.json({
      error: `No author for  the book isbn of ${req.params.isbn}`,
    });
  }

  return res.json({ Authors: getSpeceficAuthors });
});

/* 
Route : /new
Description : To post a new author
access : public
params : None
Method : post
*/

Router.post("/new", async (req, res) => {
  const { newAuthor } = await req.body;

  AuthorModel.create(newAuthor);

  return res.json({ message: "New author added" });
});

/* 
Route : /upadte
Description : To update the author
access : public
params : :id
Method : put
*/

Router.put("/update/:id", async (req, res) => {
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      Id: req.params.id,
    },
    {
      name: req.body.newAuthorName,
    },
    {
      new: true,
    }
  );
  //   database.authors.forEach((author) => {
  //     if (author.Id == req.params.id) {
  //       author.name = req.body.newName;
  //     }
  //   });

  return res.json({ Authors: updatedAuthor, message: "Updated the author" });
});

/* 
Route : /delete
Description : To delete the author
access : public
params : :id
Method : delete
*/

Router.delete("/delete/:id", async (req, res) => {
  const updatedPublication = await AuthorModel.findOneAndDelete({
    Id: req.params.id,
  });
  //   const updatedAuthors = database.authors.filter(
  //     (author) => author.Id !== parseInt(req.params.id)
  //   );

  //   database.authors = updatedAuthors;

  return res.json({ authors: updatedPublication });
});

module.exports = Router;
