// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    res.render("dashboard");
});

app.get("/homes-details", function(req, res) {
    res.render("homes-details");
});

//JSON formatted listing of home details
app.get("/admin", function(req,res) {
    var sql = 'select * from Home';
    db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });
});

//display a formatted list of home details
app.get("/dashboard", function(req, res) {
     sql = 'select * from Home';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('admin', {data: results});
    });
});


// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});
