// This file contains the routes for the book collection
// The controller functions are imported and called as needed

const express = require("express");
const {
  deleteAllBooks,
  updateAuthor,
  addBook,
  getAllBooks,
  deleteBook,
  getFirstBook,
} = require("./controller");

// Create a new router
const router = express.Router();

// Define the routes
router
  .route("/")
  .get(getAllBooks)
  .post(addBook)
  .delete(deleteBook)
  .put(updateAuthor);

router.route("/deleteall").delete(deleteAllBooks);

router.route("/getfirstbook").get(getFirstBook);

// Export the router
module.exports = router;
