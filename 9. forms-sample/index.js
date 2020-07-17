const express = require('express')
const bodyParser = require('body-parser')
const Student = require('./data/student');
const studentRepo = require('./data/studentRepository')
const app = express()
const port = 3000

// Tell Express.js in which folder to find our templates
app.set('views', './views')
// Tell Express.js which template engine to use. This one is handlebars
app.set('view engine', 'hbs')

app.use(express.static('wwwroot'))

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/about', function (req, res) {
    res.render('about-us', {
        title: 'About Us',
        message: 'This is the about us page!'
    });
});

// /print
// message=Hello
app.get('/print', function (req, res) {
    let message = req.query.message;
    res.send('<h1>Your message was: ' + message + '</h1>');
});

// /numbers
app.get('/numbers', function (req, res) {
    let start = parseInt(req.query.start);
    let stop = parseInt(req.query.stop);

    let numbers = [];

    for (let i = start; i < stop; i++) {
        numbers.push(i);
    }

    res.render('numbers', {
        numbers: numbers
    });
});

app.get('/students/register', function (req, res) {
    res.send('This will be the form for the student registration page');
});

app.post('/students/register', function (req, res) {
    let student1 = new Student(
        req.body.firstName,
        req.body.lastName,
        req.body.dob,
        req.body.interest,
    );

    studentRepo.createStudent(student1);

    res.redirect('/students')
});

app.get('/students', function (req, res) {
    let result = studentRepo.getStudents();

    res.render('students-list', {
        students: result
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))