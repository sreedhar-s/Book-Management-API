const books = [
  {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    pubDate: "2022-07-05",
    numOfPage: 225,
    category: ["fiction", "programming", "tech", "web dev"],
    publication: [1,2]
  },
  {
    ISBN: "12345TWO",
    title: "Getting started with MERN",
    authors: [1, 2],
    pubDate: "2022-07-05",
    numOfPage: 225,
    category: ["fiction","programming","tech", "web dev"],
    publication: [1,2]
  },
];

const authors = [
    {
        Id:1,
        name: "pavan",
        books: ["12345ONE","12345TWO"]
    },
    {
        Id:2,
        name:"kiran",
        books: ["12345ONE", "12345TWO"]
    }
]

const publications = [
    {
        id:1,
        name: "chakra",
        books: ["12345ONE","12345TWO"]
    },
    {
      id:2,
      name: "Vicke Publications",
      books: ["12345ONE","12345TWO"]
    }
]

module.exports = {books, authors, publications};