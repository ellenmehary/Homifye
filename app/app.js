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
    sql = 'select h.home_name, h.full_address, a.admin_name from Home h, Admin a where h.admin_id = a.admin_id';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('homes-details', {data: results});
    });
});

app.get("/dashboard", function(req, res) {
    sql = 'select count(home_id) from home';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('dashboard', {data: results});
    });
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});
