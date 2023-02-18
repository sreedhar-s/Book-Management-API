// Initilizing router
const Router = require("express").Router();

const BookModel = require("../../database/book");

/* 
Route : 
Description : To get all books
access : public
params : none
Method : get
*/
Router.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/* 
Route : /is
Description : To get specefic book based on ISBN
access : public
params : Isbn
Method : get
*/

Router.get("/is/:Isbn", async (req, res) => {
  const getSpeceficBook = await BookModel.findOne({ ISBN: req.params.Isbn });

  if (!getSpeceficBook)
    return res.json({
      error: `No book found for the ISBN of ${req.params.Isbn}`,
    });

  return res.json({ book: getSpeceficBook });
});

/* 
Route : /c
Description : To get specefic based on category
access : public
params : categoty
Method : get
*/

Router.get("/c/:category", async (req, res) => {
  const getCategoryBooks = await BookModel.findOne({
    category: req.params.category,
  });

  // const getCategoryBooks = database.books.filter((book) =>
  //   book.category.includes(req.params.category)
  // );

  if (!getCategoryBooks) {
    return res.json({
      error: `No book found for the category ${req.params.category}`,
    });
  }

  return res.json({ book: getCategoryBooks });
});

/* 
Route : /a
Description : To get specefic book based on authors
access : public
params : author
Method : get
*/

Router.get("/a/:author", async (req, res) => {
  const getAuthorBooks = await BookModel.find({ authors: req.params.author });

  // const getAuthorBooks = database.books.filter((book) =>
  //   book.authors.includes(parseInt(req.params.author))
  // );

  if (!getAuthorBooks.length) {
    return res.json({
      error: `No book found for the author ${req.params.author}`,
    });
  }

  return res.json({ book: getAuthorBooks });
});

/* 
Route : /new
Description : To add a new book
access : public
params : none
Method : post
*/

Router.post("/new", (req, res) => {
  const { newBook } = req.body;

  BookModel.create(newBook);

  return res.json({ books: newBook, message: "New book added" });
});

/* 
Route : /update
Description : To update the name of the book
access : public
params : :isbn
Method : put
*/

Router.put("/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true,
    }
  );

  // database.books.forEach((book) => {
  //   if (book.ISBN === req.params.isbn) {
  //     book.title = req.body.bookTitle;
  //     return;
  //   }
  // });

  return res.json({ books: updatedBook });
});

/* 
Route : /author/update/
Description : update/add author
access : public
params : :isbn
Method : put
*/

Router.put("/author/update/:isbn", async (req, res) => {
  //Update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $push: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  //   database.books.forEach((book) => {
  //     if (book.ISBN === req.params.isbn) {
  //       book.authors.push(req.body.newAuthor);
  //     }
  //   });

  //update the author database

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      Id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );
  //   database.authors.forEach((author) => {
  //     if (author.Id === req.body.newAuthor) {
  //       author.books.push(req.params.isbn);
  //     }
  //   });

  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    message: "New author was added",
  });
});

/* 
Route : /delete
Description : delete a book
access : public
params : : :isbn
Method : delete
*/

Router.delete("/delete/:isbn", async (req, res) => {
  const updatedDatabse = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });
  //   const updatedBookDatabase = database.books.filter(
  //     (book) => book.ISBN !== req.params.isbn
  //   );

  //   database.books = updatedBookDatabase;

  return res.json({ books: updatedDatabse });
});

/* 
Route : /delete/author
Description : delete a author from book
access : public
params : : :isbn, :authorID
Method : delete
*/

Router.delete("/delete/author/:isbn/:authorID", async (req, res) => {
  //update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        authors: parseInt(req.params.authorID),
      },
    },
    {
      new: true,
    }
  );
  //   database.books.forEach((book) => {
  //     if (book.ISBN === req.params.isbn) {
  //       const newAuthorList = book.authors.filter(
  //         (author) => author !== parseInt(req.params.authorID)
  //       );
  //       book.authors = newAuthorList;
  //       return;
  //     }
  //   });

  //Update the author databse

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      Id: parseInt(req.params.authorID),
    },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );

  //   database.authors.forEach((author) => {
  //     if (author.Id === parseInt(req.params.authorID)) {
  //       const newBookList = author.books.filter(
  //         (book) => book !== req.params.isbn
  //       );
  //       author.books = newBookList;
  //       return;
  //     }
  //   });

  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
  });
});

module.exports = Router;