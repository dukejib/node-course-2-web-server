/** Global Require */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

/** For Heroku */
const port = process.env.PORT || 3000; 

/** Create your express app */
var app = express();

/** Our Partials directory */
hbs.registerPartials(__dirname + '/views/partials');
/** Our View Engine Setup */
app.set('view engine','hbs');

/** Middleware  - App Logger */
app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +  '\n',(err) => {
        if(err) {
            console.log('unable to append to server.log');
        }
    });
    //next lets you move pass req,res
    next();
});
/** App Maintenance Mode. Use Next() to move past it */
// app.use( (req,res,next) => {
//     res.render('maintenance.hbs');
// });

/** use the local public directory for static pages */
app.use(express.static(__dirname + '/public'));

/** Create Helpers */
hbs.registerHelper('getCurrentYear',() => {  return new Date().getFullYear();  });
hbs.registerHelper('screamIt', (text) => { return text.toUpperCase(); });
hbs.registerHelper('websiteTitle',() => { return 'Node.js / Express / Heroku'; });
/** create handlers */

app.get('/',(req,res) => {
    res.render('home.hbs',{
        websiteTitle:'Node.js Testing',
        pageTitle:'Welcome Visitors!',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to Node.js , Express & Handlebar Tutorial'
    });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        websiteTitle:'Node.js Testing',
        pageTitle:'About Page',
        currentYear: new Date().getFullYear(),
        pText: 'Node.js,Express & Handlebars Templating Engine is a match made in heaven.'
    });
});

app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle:'Projects'
    });
});

app.get('/json',(req,res) => {
    // res.send('<h1>This is a history request</h1>')
    res.send({
        title:'Nodejs with Express',
        language:'JavaScript',
        editor:[
            'Visual Code',
            'Php Storm'
        ]
    });
});


app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'Unable to return data'
    });
});

/** Now bind the app to port and start it */
// app.listen(3000, () => console.log('Example app listening on port 3000!'));
app.listen(port,() => { console.log(`Server is up and running on ${port}`);});