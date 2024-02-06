const express = require("express");

const app = express();

// HTTP Verbs - GET, POST, PUT, DELETE

// const response = await fetch("http://someaddress.com"); // sends GET request

// HTTP Verb GET

const fakeArr = [];

app.use(express.json());

app.get("/books", (request, response) => {
  console.log("/books: ", request.path);
  response.send({ message: "success", fakeArr: fakeArr });
});

app.get("/books/getfirstbook", (request, response) => {
  // get te first book
  console.log("/books/books: ", request.path);
  const book = fakeArr[0];
  response.send({ message: "success", book: book });
});

app.post("/books", (request, response) => {
  console.log("title: ", request.body.title);
  console.log("genre: ", request.body.genre);
  console.log("author: ", request.body.author);

  fakeArr.push(request.body);

  let awesome;
  for (let i = 0; i < fakeArr.length; i++) {
    if (fakeArr[i].title === request.body.title) {
      awesome = "it's awsome";
    }
  }
  console.log(awesome);
  response.send({ message: "success", newBook: fakeArr[fakeArr.length - 1] });
});

app.put("/books", (request, response) => {
  console.log("fakArr", fakeArr);
  // Find the book to update
  const bookToUpdate = fakeArr.find(
    (book) => book.title === request.body.title
  );
  console.log("book to update: ", bookToUpdate);
  // Update the book
  bookToUpdate.author = request.body.newAuthor;

  console.log("book to update: ", bookToUpdate);

  response.send({ message: "success" });
});

app.delete("/books", (request, response) => {
  // Find the book to delete
  const bookToDelete = fakeArr.find(
    (book) => book.title === request.body.title
  );

  // Delete the book
  const index = fakeArr.indexOf(bookToDelete);
  fakeArr.splice(index, 1);

  response.send({ message: "success" });
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
