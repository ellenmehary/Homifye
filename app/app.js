// Import express.js
const express = require("express");

// Create express app
var app = express();

const { User } = require("./models/user");

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');
app.use(express.urlencoded({ extended: true }));


// Create a route for root - /
app.get("/dashboard", function(req, res) {
    res.render("dashboard");
});

//Home-Details Page Code//
app.get("/homes-details", function(req, res) {
    sql = 'select h.home_name, h.full_address, a.admin_name from Home h, Admin a where h.admin_id = a.admin_id';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('homes-details', {data: results});
    });
});

//Login Page Code//
app.get('/login', function(req, res) {
        res.render('login');
    });

app.post('/add-note', function (req, res) {
    // Adding a try/catch block which will be useful later when we add to the database
    try {
        // Just a console.log for now to check we are receiving the form field values
        console.log(req.body);
     } catch (err) {
         console.error(`Error while adding note `, err.message);
     }
     // Just a little output for now
     res.send('form submitted');

});

// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
    params = req.body;
    var user = new User(params.email);
    try {
        uId = await user.getIdFromEmail();
        if (uId) {
            match = await user.authenticate(params.password);
            if (match) {
                res.redirect('/' + uId);
            }
            else {
                // TODO improve the user journey here
                res.send('invalid password');
            }
        }
        else {
            res.send('invalid email');
        }
    } catch (err) {
        console.error(`Error while comparing `, err.message);
    }
});

app.post('/set-password', async function (req, res) {
        params = req.body;
        var user = new User(params.email);
        try {
            uId = await user.getIdFromEmail();
            if (uId) {
                // If a valid, existing user is found, set the password and redirect to the users single-student page
                await user.setUserPassword(params.password);
                res.redirect('/' + uId);
            }
            else {
                // If no existing user is found, add a new one
                newId = await user.addUser(params.email);
                res.send('Perhaps a page where a new user sets a programme would be good here');
            }
        } catch (err) {
            console.error(`Error while adding password `, err.message);
        }
    });


app.get('/add-member', function(req, res) {
        res.render('addmember');
    });

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});
