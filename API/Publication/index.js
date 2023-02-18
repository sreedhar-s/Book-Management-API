const Router = require("express").Router();

const PublicationModel = require("../../database/publication");

/* 
Route : 
Description : To get all the publications
access : public
params : None
Method : get
*/

Router.get("", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json({ Publications: getAllPublications });
});

/* 
Route : /i
Description : To get specefic publication based on Id
access : public
params : id
Method : get
*/

Router.get("/i/:id", async (req, res) => {
  const getSpeceficPublication = await PublicationModel.findOne({
    id: req.params.id,
  });

  // const getSpeceficPublication = database.publications.filter(
  //   (pub) => pub.id === parseInt(req.params.id)
  // );

  if (!getSpeceficPublication) {
    return res.json({
      error: `No publication found for the id ${req.params.id}`,
    });
  }

  return res.json({ Publication: getSpeceficPublication });
});

/* 
Route : /is
Description : To get all the publication based on isbn
access : public
params : isbn
Method : get
*/

Router.get("/is/:isbn", async (req, res) => {
  const getPublication = await PublicationModel.find({
    books: req.params.isbn,
  });
  // const getPublication = database.publications.filter((pub) =>
  //   pub.books.includes(req.params.isbn)
  // );

  if (getPublication.length === 0) {
    return res.json({
      error: `No publication found for the book ${req.params.isbn}`,
    });
  }

  return res.json({ Publications: getPublication });
});

/* 
Route : /new
Description : To post a new publication
access : public
params : None
Method : post
*/

Router.post("/new", async (req, res) => {
  const { newPublication } = await req.body;

  PublicationModel.create(newPublication);
  // database.publications.push(newPublication);

  return res.json({
    message: "New Publication added",
  });
});

/* 
Route : /update
Description : To update a publication
access : public
params : :id
Method : put
*/

Router.put("/update/:id", async (req, res) => {
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
      id: req.params.id,
    },
    {
      name: req.body.newPubName,
    },
    {
      new: true,
    }
  );
  //   database.publications.forEach((pub) => {
  //     if (pub.id == req.params.id) {
  //       pub.name = req.body.newName;
  //     }
  //   });

  return res.json({
    publications: updatedPublication,
    message: "Updated the publications",
  });
});

/* 
Route : /book/update/
Description : To update/add a new book publication
access : public
params : : isbn
Method : put
*/

Router.put("/book/update/:isbn", async (req, res) => {
  //Update the publication database
  const updatedBooks = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $push: {
        publication: req.body.newPublication,
      },
    },
    {
      new: true,
    }
  );

  //   database.books.forEach((book) => {
  //     if (book.ISBN === req.params.isbn) {
  //       book.publication = req.body.newPublication;
  //     }
  //   });
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
      id: req.body.newPublication,
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

  //   database.publications.forEach((pub) => {
  //     if (pub.id === req.body.pubId) {
  //       return pub.books.push(req.params.isbn);
  //     }
  //   });

  return res.json({
    books: updatedBooks,
    publications: updatedPublication,
    message: "New Publication is added",
  });
});

/* 
Route : /delete
Description : To delete an publication
access : public
params : : id
Method : delete
*/

Router.delete("/delete/:id", async (req, res) => {
  const updatedPublication = await PublicationModel.findOneAndDelete({
    id: req.params.id,
  });
  //   const updatedPublication = database.publications.filter(
  //     (pub) => pub.id !== parseInt(req.params.id)
  //   );

  //   database.publications = updatedPublication;

  return res.json({ Publications: updatedPublication });
});

/* 
Route : /delete/book
Description : To delete an publication from book
access : public
params : :isbn, :id
Method : delete
*/

Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {
  //Upadte the book databse

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        publication: parseInt(req.params.pubId),
      },
    },
    {
      new: true,
    }
  );
  //   database.books.forEach((book) => {
  //     if (book.ISBN === req.params.isbn) {
  //       const newPublication = book.publication.filter(
  //         (pub) => pub !== parseInt(req.params.pubId)
  //       );
  //       book.publication = newPublication;
  //       return;
  //     }
  //   });

  //Update the publication database

  const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
      id: parseInt(req.params.id),
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
  //   database.publications.forEach((pub) => {
  //     if (pub.id === parseInt(req.params.pubId)) {
  //       const newBooks = pub.books.filter((book) => book !== req.params.isbn);
  //       pub.books = newBooks;
  //       return;
  //     }
  //   });

  return res.json({
    books: updatedBook,
    publications: updatedPublication,
  });
});

module.exports = Router;