const port = 8000;
projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
//dependencies
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//initialize the main project folder
app.use(express.static("app"));

// Print that the server is running
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

//GET route
app.get("/lastEntry", function (req, res) {
  res.send(projectData);
});

//POST route
app.post("/addLog", addWeather);

function addWeather(req, res) {
  projectData = {
    date: req.body.date,
    content: req.body.content,
    temp: req.body.temp,
  };
  res.send(projectData);
}
