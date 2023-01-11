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
app.get("/", function(req, res) {
    res.render("homepage");
});
// Code for Dashboard/
app.get('/dashboard', function(req, res) {
    res.render('dashboard');
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
//ADD NEW MEMBER PAGE//
app.get('/add-member', function(req, res) {
    res.render('addmember');
});
//Login Page Code//
app.get('/login', function(req, res) {
        res.render('login');
    });
// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
    params = req.body;
    var user = new User(params.email);
    console.log(params);
    var user = new User(params.loginUser);
    console.log(user);
    try {
        uId = await user.getIdFromEmail();
        console.log(uId);
        if (uId) {
            match = await user.authenticate(params.password);
            match = await user.authenticate(params.loginPassword);
            if (match) {
                res.redirect('/dashboard');
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
// Register Page Code//
 app.get('/register', function(req, res) {
        res.render('register');
    });
 // REGISTER DATA TO BACKEND//   
app.post('/set-password', async function (req, res) {
    params = req.body;
    var user = new User(params.email);
    try {
        uId = await user.getIdFromEmail();
        if (uId) {
            // If a valid, existing user is found, set the password and redirect to the users single-student page
            await user.setUserPassword(params.password);
            res.redirect('/dashboard/' + uID);
            }
            else {
                // If no existing user is found, add a new one and redirect to success register page
                newId = await user.addUser(params.email);
                res.redirect('/successful-register');
            }
        } catch (err) {
            console.error(`Error while adding password `, err.message);
        }
    });
// After register is successful
app.get('/successful-register', function(req, res) {
        res.render('afterregister');
    });    
// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});