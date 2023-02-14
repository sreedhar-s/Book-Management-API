const books = [
  {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    pubDate: "2022-07-05",
    numOfPage: 225,
    category: ["fiction", "programming", "tech", "web dev"],
    publication: 1,
  },
  {
    ISBN: "12345TWO",
    title: "Getting started with MERN",
    authors: [1, 2],
    pubDate: "2022-07-05",
    numOfPage: 225,
    category: ["fiction","programming","tech", "web dev"],
    publication: 1,
  },
];

const authors = [
    {
        Id:1,
        name: "pavan",
        books: ["12345ONE"]
    },
    {
        Id:2,
        name:"kiran",
        books: ["12345ONE"]
    }
]

const publications = [
    {
        id:1,
        name: "chakra",
        books: ["12345ONE"]
    }
]

module.exports = {books, authors, publications};

