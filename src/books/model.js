// bookSchema is a mongoose schema that defines the structure of a book document in the database
const mongoose = require("mongoose");

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

// Export the model
module.exports = mongoose.model("Book", bookSchema);
