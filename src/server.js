// Import the Express framework
const express = require("express");

// Create an Express application
const app = express();

// Create an empty array to store fake book data
const fakeArr = [];

// Use JSON middleware to parse incoming JSON requests
app.use(express.json());

// Handle GET request for all books
app.get("/books", (request, response) => {
  console.log("/books: ", request.path);
  response.send({ message: "books have been found", fakeArr: fakeArr });
});

// Handle GET request for the first book
app.get("/books/getfirstbook", (request, response) => {
  console.log("/books/getfirstbook: ", request.path);
  const book = fakeArr[0];
  response.send({ message: "success", book: book });
});

// Handle POST request to add a new book
app.post("/books", (request, response) => {
  console.log("title: ", request.body.title);
  console.log("genre: ", request.body.genre);
  console.log("author: ", request.body.author);

  // Add the new book to the array
  fakeArr.push(request.body);

  let awesome;
  // Check if the added book is already in the array
  for (let i = 0; i < fakeArr.length; i++) {
    if (fakeArr[i].title === request.body.title) {
      awesome = "request has been processed";
    }
  }
  console.log(awesome);
  response.send({
    message: "book has been added",
    newBook: fakeArr[fakeArr.length - 1],
  });
});

// Handle PUT request to update a book's author
app.put("/books", (request, response) => {
  console.log("fakeArr", fakeArr);

  // Find the book to update
  const bookToUpdate = fakeArr.find(
    (book) => book.title === request.body.title
  );

  console.log("book to update: ", bookToUpdate);

  // Update the book's author if found
  if (!bookToUpdate) {
    console.error(`"${request.body.title}" cannot be found`);
    return;
  }
  bookToUpdate.author = request.body.newAuthor;

  console.log("book updated: ", bookToUpdate);

  response.send({ message: "author has been changed" });
});

// Handle DELETE request to delete a book
app.delete("/books", (request, response) => {
  // Find the book to delete
  const bookToDelete = fakeArr.find(
    (book) => book.title === request.body.title
  );

  // Check if the book exists
  if (!bookToDelete) {
    console.error(`"${request.body.title}" cannot be found`);
    return;
  }

  // Delete the book from the array
  const index = fakeArr.indexOf(bookToDelete);
  fakeArr.splice(index, 1);

  response.send({ message: "book has been deleted" });
});

// Start the server and listen on port 5001
app.listen(5001, () => {
  console.log("server is listening (port 5001)");
});
