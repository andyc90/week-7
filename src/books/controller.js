// Imports the Book model from the ./model file.
const Book = require("./model");

// Handle GET request for all books
exports.getAllBooks = async (request, response) => {
  try {
    const books = await Book.find();
    if (!books.length) {
      console.log("\x1b[31m%s\x1b[0m", "Error");
      return response
        .status(404)
        .json({ message: "Books could not be found." });
    }
    console.log("\x1b[32m%s\x1b[0m", "Success");
    return response.status(200).json({
      data: books,
      message: "All books have been successfully retrieved.",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Error occurred while retrieving books." });
  }
};

// Handle GET request for the first book

exports.getFirstBook = async (request, response) => {
  try {
    const books = await Book.find();
    const firstBook = books[0];

    if (!firstBook) {
      console.log("\x1b[31m%s\x1b[0m", "Error");
      return response.status(404).json({ message: "Book could not be found." });
    }
    console.log("\x1b[32m%s\x1b[0m", "Success");
    return response.status(200).json({
      data: firstBook,
      message: "First book retrieved successfully.",
    });
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Error");
    return response
      .status(500)
      .json({ message: "An error occurred while retrieving the first book." });
  }
};

// Handle POST request to add a new book

exports.addBook = async (request, response) => {
  try {
    await Book.create(request.body);
    console.log("\x1b[32m%s\x1b[0m", "Success");
    return response.status(201).json({ message: "Book added successfully." });
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Error");
    const errorMessage = "Book already exists.";
    return response.status(400).json({ message: errorMessage });
  }
};

// Handle PUT request to update a book's author

exports.updateAuthor = async (request, response) => {
  try {
    const book = await Book.findOne({ title: request.body.title });

    if (!book) {
      console.log("\x1b[31m%s\x1b[0m", "Error");
      return response.status(404).json({ message: "Book could not be found." });
    }

    book.author = request.body.author;

    await book.save();
    console.log("\x1b[32m%s\x1b[0m", "Success");
    return response
      .status(200)
      .json({ message: "Author updated successfully." });
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Error");
    return response
      .status(500)
      .json({ message: "Error occured while updating author." });
  }
};
// Handle DELETE request to delete a book
exports.deleteBook = async (request, response) => {
  try {
    const deletedBook = await Book.findOneAndDelete(request.body);

    if (!deletedBook) {
      console.log("\x1b[31m%s\x1b[0m", "Error");
      return response
        .status(404)
        .json({ message: "Books could not be found." });
    }
    console.log("\x1b[32m%s\x1b[0m", "Success");
    return response.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Error");
    return response
      .status(500)
      .json({ message: "Error occurred while deleting the book." });
  }
};

// Handle DELETE request to delete all books

exports.deleteAllBooks = async (request, response) => {
  try {
    const deletedBooks = await Book.deleteMany({});

    if (!deletedBooks.deletedCount) {
      console.log("\x1b[31m%s\x1b[0m", "Error");
      return response.status(404).json({ message: "Book could not be found." });
    }
    console.log("\x1b[32m%s\x1b[0m", "Success");
    return response
      .status(200)
      .json({ message: "All books have been deleted successfully." });
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Error");
    return response
      .status(500)
      .json({ message: "Error occurred while deleting all books." });
  }
};
