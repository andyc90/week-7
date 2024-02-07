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
  console.log("Connected to MongoDB");
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
    return response.status(200).json({
      data: books,
      message: "All books have been successfully retrieved.",
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error occurred while retrieving books." });
  }
});

// Handle GET request for the first book
app.get("/books/getfirstbook", async (request, response) => {
  try {
    const books = await Book.find();
    const firstBook = books[0];

    if (!firstBook) {
      return response.status(404).json({ message: "Book not found." });
    }

    return response.status(200).json({
      data: firstBook,
      message: "First book retrieved successfully.",
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "An error occurred while retrieving the first book." });
  }
});

// Handle POST request to add a new book
app.post("/books", async (request, response) => {
  try {
    await Book.create(request.body);
    return response.status(201).json({ message: "Book added successfully." });
  } catch (error) {
    const errorMessage = "Error occurred while creating a new book.";
    return response.status(400).json({ message: errorMessage });
  }
});

// Handle PUT request to update a book's author
app.put("/books", async (request, response) => {
  try {
    const book = await Book.findOne({ title: request.body.title });

    if (!book) {
      return response.status(404).json({ message: "Book could not be found." });
    }

    book.author = request.body.author;

    await book.save();

    return response
      .status(200)
      .json({ message: "Author updated successfully." });
  } catch (error) {
    return response.status(500).json({ message: "Error updating author." });
  }
});

// Handle DELETE request to delete a book by title
app.delete("/books", async (request, response) => {
  try {
    const deletedBook = await Book.findOneAndDelete(request.body);

    if (!deletedBook) {
      return response.status(404).json({ message: "Book could not be found." });
    }

    return response.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error occurred while deleting the book." });
  }
});

// Start the server and listen on port 5001
app.listen(5001, () => {
  console.log("Listening on port 5001");
});
