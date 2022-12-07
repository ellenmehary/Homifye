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
    res.render("index");
});

app.get("/admin", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from Admin';
    db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });
});

// Task 2 display a formatted list of Admin
app.get("/admin-formatted", function(req, res) {
    var sql = 'select * from Admin';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('admininfo', {data: results});
    });
});


//display a formatted list of admin_id 
app.get("/admin_homes", function(req, res) {
    sql = 'select * from Admin_Homes';
    db.query(sql).then(results => {
        console.log(results);
        res.render('admin_home', {results});
    });
});


//display a formatted list of admin table
app.get("/dashboard", function(req, res) {
     sql = 'select * from Admin';
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
