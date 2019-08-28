// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

var tablelist = [];
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
//displays tables and waiting list
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays reservation addition
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays a table list
app.get("/api/tables", function (req, res) {

  console.log(tablelist);
/*
  for (var i = 0; i < 5; i++) {
    var customerName = tablelist[i].customerName;
    var phoneNumber = tablelist[i].phoneNumber;
    var customerEmail = tablelist[i].customerEmail;
    var customerID = tablelist[i].customerID;

    $().append("Customer Name: " + customerName);
    $().append("Phone Number: " + phoneNumber);
    $().append("Customer Email: " + customerEmail);
    $().append("Customer Id: " + customerID);
  }
*/

});

// Create a reserve post route
app.post("/api/reserve", function (req, res) {
  tablelist.push(
    {
      customerName: req.body.customerName || "",
      phoneNumber: req.body.phoneNumber || "",
      customerEmail: req.body.customerEmail || "",
      customerID: req.body.customerID || ""
    }
  );
  if(tablelist.length > 5){
    res.status(200).send("You have been added to the wait list");
  }else{
    res.status(200).send("Your reservation has been accepted");
  }
  
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
