//Frame Work
const { request } = require("express");
const express = require("express");

//Database
const database = require("./database/index");

const api = express();

api.use(express.json());

/* 
Route : /book
Description : To get all books
access : public
params : none
Method : get
*/
api.get("/book", (req, res) => {
  return res.json({ books: database.books });
});

/* 
Route : /book/is
Description : To get specefic book based on ISBN
access : public
params : Isbn
Method : get
*/

api.get("/book/is/:Isbn", (req, res) => {
  const ISBN = req.params.Isbn;

  const getSpeceficBook = database.books.filter((book) => book.ISBN === ISBN);

  if (getSpeceficBook.length == 0)
    return res.json({
      error: `No book found for the ISBN of ${req.params.Isbn}`,
    });

  return res.json({ book: getSpeceficBook });
});

/* 
Route : /book/c
Description : To get specefic based on category
access : public
params : categoty
Method : get
*/

api.get("/book/c/:category", (req, res) => {
  const getCategoryBooks = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getCategoryBooks.length == 0) {
    return res.json({
      error: `No book found for the category ${req.params.category}`,
    });
  }

  return res.json({ book: getCategoryBooks });
});

/* 
Route : /book/a
Description : To get specefic book based on authors
access : public
params : author
Method : get
*/

api.get("/book/a/:author", (req, res) => {
  const getAuthorBooks = database.books.filter((book) =>
    book.authors.includes(parseInt(req.params.author))
  );

  if (getAuthorBooks.length == 0) {
    return res.json({
      error: `No book found for the category ${req.params.author}`,
    });
  }

  return res.json({ book: getAuthorBooks });
});


/* 
Route : /book/new
Description : To add a new book
access : public
params : none
Method : post
*/

api.post("/book/new", (req, res) => {
    const {newBook} = req.body;

    database.books.push(newBook);

    return res.json({books : database.books, message : "New book added"});
});


/* 
Route : /book/update
Description : To update the name of the book
access : public
params : :isbn
Method : put
*/

api.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.bookTitle;
            return;
        }
    });

    return res.json({books : database.books});
})


/* 
Route : /book/author/update/
Description : update/add author
access : public
params : :isbn
Method : put
*/

api.put("/book/author/update/:isbn", (req, res) => {
    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.authors.push(req.body.newAuthor)
        }
    });

    //update the author database
    database.authors.forEach((author) => {
        if(author.Id === req.body.newAuthor){
            author.books.push(req.params.isbn);
        }
    })

    return res.json({
        books: database.books,
        authors : database.authors,
        message : "New author was added"
    });
})

/* 
Route : /book/delete
Description : delete a book
access : public
params : : :isbn
Method : delete
*/

api.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );

    database.books = updatedBookDatabase;

    return res.json({books : database.books});
});

/* 
Route : /book/delete/author
Description : delete a author from book
access : public
params : : :isbn, :authorID
Method : delete
*/

api.delete("/book/delete/author/:isbn/:authorID", (req, res) => {
    //update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter((author) => 
                author !== parseInt(req.params.authorID)
            );
            book.authors = newAuthorList;
            return;
        }
    });

    
    //Update the author databse
    database.authors.forEach((author) => {
        if(author.Id === parseInt(req.params.authorID)){
            const newBookList = author.books.filter((book) => book !== req.params.isbn);
            author.books = newBookList;
            return;
        }
    });

    return res.json({books : database.books, authors : database.authors});
})

/* 
Route : /author
Description : To get all the authors
access : public
params : None
Method : get
*/

api.get("/author", (req, res) => {
  return res.json({ authors: database.authors });
});

/* 
Route : /author
Description : To get specefic author based on id
access : public
params : id
Method : get
*/

api.get("/author/i/:id", (req, res) => {
  const getAuthor = database.authors.filter(
    (author) => author.Id === parseInt(req.params.id)
  );

  if (getAuthor.length == 0) {
    return res.json({ error: `No author found for the id ${req.params.id}` });
  }

  return res.json({ Authors: getAuthor });
});

/* 
Route : /author/is
Description : To get specefic author based on a book
access : public
params : ISBN
Method : get
*/

api.get("/author/is/:isbn", (req, res) => {
  const getSpeceficAuthors = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpeceficAuthors.length === 0) {
    return res.json({
      error: `No author for  the book isbn of ${req.params.isbn}`,
    });
  }

  return res.json({ Authors: getSpeceficAuthors });
});

/* 
Route : /author/new
Description : To post a new author
access : public
params : None
Method : post
*/

api.post("/author/new", (req, res) => {
    const {newAuthor} = req.body;

    database.authors.push(newAuthor);

    return res.json({Authors : database.authors, message : "New author added"});
});

/* 
Route : /author/upadte
Description : To update the author
access : public
params : :id
Method : put
*/

api.put(("/author/update/:id"), (req, res) => {
    database.authors.forEach((author) => {
        if(author.Id == req.params.id){
            author.name = req.body.newName;
        }
    })

    return res.json({Authors : database.authors, message: "Updated the author"});
})

/* 
Route : /author/delete
Description : To delete the author
access : public
params : :id
Method : delete
*/

api.delete("/author/delete/:id", (req, res) => {
    const updatedAuthors  = database.authors.filter((author) =>
        author.Id !== parseInt(req.params.id)
    );

    database.authors = updatedAuthors;

    return res.json({authors : database.authors});
})

/* 
Route : /pub
Description : To get all the publications
access : public
params : None
Method : get
*/

api.get("/pub", (req, res) => {
  return res.json({ Publications: database.publications });
});

/* 
Route : /pub/i
Description : To get all the publication based on Id
access : public
params : id
Method : get
*/

api.get("/pub/i/:id", (req, res) => {
  const getSpeceficPublication = database.publications.filter(
    (pub) => pub.id === parseInt(req.params.id)
  );

  if (getSpeceficPublication.length === 0) {
    return res.json({
      error: `No publication found for the id ${req.params.id}`,
    });
  }

  return res.json({ Publication: getSpeceficPublication });
});

/* 
Route : /pub/is
Description : To get all the publication based on isbn
access : public
params : isbn
Method : get
*/

api.get("/pub/is/:isbn", (req, res) => {
  const getPublication = database.publications.filter((pub) =>
    pub.books.includes(req.params.isbn)
  );

  if (getPublication.length === 0) {
    return res.json({
      error: `No publication found for the book ${req.params.isbn}`,
    });
  }

  return res.json({ Publications: getPublication });
});


/* 
Route : /pub/new
Description : To post a new publication
access : public
params : None
Method : post
*/

api.post("/pub/new", (req, res) => {
    const {newPublication} = req.body;

    database.publications.push(newPublication);

    return res.json({Authors : database.publications, message : "New Publication added"});
});

/* 
Route : /pub/update
Description : To update a publication
access : public
params : :id
Method : put
*/

api.put("/pub/update/:id", (req, res) => {
    database.publications.forEach((pub) => {
        if (pub.id == req.params.id) {
            pub.name = req.body.newName;
        }
    });

    return res.json({ publications: database.publications, message: "Updated the publications" });
});

/* 
Route : /pub/book/update/
Description : To update/add a new book publication
access : public
params : : isbn
Method : put
*/

api.put("/pub/book/update/:isbn", (req, res) => {
    //Update the publication database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.newPublication;
        }
    });

    database.publications.forEach((pub) => {
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });

    return res.json(
        {books : database.books,
        publications : database.publications,
        message : "New Publication is added"}
    )
})

/* 
Route : /pub/delete
Description : To delete an publication
access : public
params : : id
Method : delete
*/

api.delete("/pub/delete/:id", (req, res) => {
    const updatedPublication = database.publications.filter((pub) => 
        pub.id !== parseInt(req.params.id)
    );

    database.publications = updatedPublication;

    return res.json({Publications : database.publications});
});


/* 
Route : /pub/delete/book
Description : To delete an publication from book
access : public
params : :isbn, :id
Method : delete
*/

api.delete("/pub/delete/book/:isbn/:pubId", (req, res) => {
    //Upadte the book databse
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newPublication = book.publication.filter((pub) => 
                pub !== parseInt(req.params.pubId)
            )
            book.publication = newPublication;
            return;
        }
    })


    //Update the publication database
    database.publications.forEach((pub) => {
        if(pub.id === parseInt(req.params.pubId)){
            const newBooks = pub.books.filter((book) => 
                book !== req.params.isbn
            );
            pub.books = newBooks;
            return;
        }
    })

    return res.json({books: database.books, publications : database.publications});
})

api.listen(5000, () => console.log("Server is running!!!!"));