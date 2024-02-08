// Load environment variables from a .env file
require("dotenv").config();

// Import the Express framework
const express = require("express");
const connection = require("./db/connection");
const bookRoutes = require("./books/routes");

// Create an Express application
const app = express();
connection();

// Use JSON to parse incoming JSON requests
app.use(express.json());

// Export the bookRoutes module
app.use("/books", bookRoutes);

// Start the server and listen on port 5001
app.listen(5001, () => {
  console.log("Listening on port 5001");
});
