const express = require("express");
const {
  deleteAllBooks,
  updateAuthor,
  addBook,
  getAllBooks,
  deleteBook,
  getFirstBook,
} = require("../controllers/bookControllers");
const router = express.Router();

router
  .route("/")
  .get(getAllBooks)
  .post(addBook)
  .delete(deleteBook)
  .put(updateAuthor);

router.route("/deleteall").delete(deleteAllBooks);

router.route("/getfirstbook").get(getFirstBook);

module.exports = router;
