// Get dependencies
var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// import the routing file to handle the default (index) route
var index = require("./server/routes/app");

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...
const taskRoutes = require("./server/routes/tasks");
const processRoutes = require("./server/routes/processes");
const projectRoutes = require("./server/routes/projects");

// Connect to the MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/process-mgmt", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.error("Connection failed: " + err);
  });

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, "dist/process-mgmt")));

// Tell express to map the default route ('/') to the index route
app.use("/", index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use("/tasks", taskRoutes);
app.use("/processes", processRoutes);
app.use("/projects", projectRoutes);

// Tell express to map all other non-defined routes back to the index page
// Newer version required syntax change form "*" to /.*/
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist/process-mgmt/index.html"));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log("API running on localhost: " + port);
});
