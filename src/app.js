const path = require('path');
const express = require('express');
const hbs = require('hbs');
//const student = require('./utils/student');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    
        res.render('login', {
            title: 'WELCOME',
            name: 'Pragma Apps'
            
        });
    });


app.get('/index', (req, res) => {
    
    res.render('index', {
        title: 'Apple Stores',
        name: 'Pragma Apps'
    });
});
    


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead'
    })
});

app.get('/remove', (req, res) => {
    res.render('remove', {
        helpText: 'Enter the location which is to be removed',
        title: 'Remove',
        name: 'Andrew Mead'
    })
});

app.get('/search', (req, res) => {

    res.render('search', {
        title: 'Search Bar',
        name: 'Mrinal',
        
         
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})