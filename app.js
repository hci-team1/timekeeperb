
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

////////// this is going to be our homescreen page for timkeeper //////////
var index = require('./routes/index');

/********** this is for timekeeper **********/
var about = require('./routes/about');				// this is the about page
var contactus = require('./routes/contactus');		// this is the contact us page
var faqs = require('./routes/faqs');				// this is the faqs page
var loginpage = require('./routes/loginpage');		// this is the login page
var settings = require('./routes/settings');		// this is the settings page
var signup = require('./routes/signup');			// this is the sign up page
var todayschedule = require('./routes/todayschedule');	// schedule page
var addtask = require('./routes/addtask');			// this is the add task page
var currenttask = require('./routes/currenttask');	// this is the tasks page
var homescreen = require('./routes/homescreen');	// this is the homescreen

////////// connect to the mongo database //////////
var local_database_name = 'timekeeper';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route to the main menu
app.get('/', index.view);

/********** route the ULR to the controller for timekeeper **********/
app.get('/about', about.view);				// just view the about page
app.get('/contactus', contactus.view);		// (change so you can submit too)
app.get('/faqs', faqs.view);				// just view the faqs page

app.get('/loginpage', loginpage.view);		// just view the login page
app.get('/loginpage', loginpage.loginUser);	// IMPLEMENT THIS 

app.get('/settings', settings.view);		// just view the settings page

app.get('/signup', signup.view);			// just view the signup page
app.get('/signup', signup.signupUser);	// IMPLEMENT THIS

app.get('/todayschedule', todayschedule.view);	// change this?
app.post('/todayschedule', todayschedule.showSchedule);	// IMPLEMENT THIS

app.get('/addtask', addtask.view);			// change this too so you can add

app.get('/currenttask', currenttask.view);	// change this too
app.post('/currenttask', currenttask.addTasks);		// IMPLEMENT THIS

//TODO fix post url conflict
app.post('/currenttask/deleted', currenttask.deleteTasks);	// IMPLEMENT THIS

app.get('/homescreen', homescreen.view);	// view the homescreen

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
