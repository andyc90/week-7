require("dotenv").config();

// Import the Express framework
const express = require("express");
const mongoose = require("mongoose");

// Create an Express application
const app = express();

// Use JSON to parse incoming JSON requests
app.use(express.json());

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connection is working");
};

connection();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

// Handle GET request for all books
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({ data: books });
  } catch (error) {
    return response.status(400).json(error);
  }
});

// Handle GET request for the first book
app.get("/books/getfirstbook", async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).json({ data: books[0] });
  } catch (error) {
    return response.status(400).json(error);
  }
});

// Handle POST request to add a new book
app.post("/books", async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    return response.status(201).json({ data: newBook });
  } catch (error) {
    return response.status(400).json(error);
  }
});

// Handle PUT request to update a book's author
app.put("/books", async (request, response) => {});

// Handle DELETE request to delete a book by title
app.delete("/books", async (request, response) => {
  try {
    const deletedBook = await Book.findOneAndDelete(request.body);
    return response.status(200).json({ data: deletedBook });
  } catch (error) {
    return response.status(400).json(error);
  }
});

// Start the server and listen on port 5001
app.listen(5001, () => {
  console.log("server is listening (port 5001)");
});
