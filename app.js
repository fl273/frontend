const express = require('express');
const ejs = require('ejs'); // Templating Engine
const app = express();

//Really, our HackRU user.
const fakeUser = {
    "_id": {
        "$oid": "598ddc244b8f2b6dd8e39597"
    },
    "id": 0,
    "data_sharing": true,
    "resume": "example_resume",
    "github": "example_github",
    "registration_status": 2,
    "role": {
        "attendee": false,
        "mentor": false,
        "volunteer": false,
        "organizer": false,
        "admin": true,
        "director": false
    },
    "local": {
        "password": "defacto",
        "email": "team@hackru.org"
    },
    "mlh_data": {
        "gender": "Non-Binary",
        "date_of_birth": "2011-01-01",
        "special_needs": null,
        "dietary_restrictions": "None",
        "shirt_size": "Unisex - L",
        "major": "Computer Science",
        "level_of_study": "University (Undergraduate)",
        "last_name": "Team",
        "first_name": "HackRU",
        "email": "team@hackru.org",
        "mlhid": 56778,
        "school": {
            "id": 2037,
            "name": "Rutgers, The State University of New Jersey"
        }
    },
    "__v": 0,
    "short_answer": "asdf",
    "grad_year": 2018
}



app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.render('index.ejs', { user: fakeUser, message: false });
});

app.get('/dashboard', function (req, res) {
    res.render('dashboard.ejs', { user: fakeUser, qrimage:"http://placekitten.com/500/500", message: false });
});

app.get('/dashboard-dayof', function (req, res) {
    res.render('dashboard-dayof.ejs', { anouncementsMarkup: "Use Camelot to see these!", eventsMarkup: "Use Camelot to see these!", user: fakeUser, qrimage:"http://placekitten.com/500/500", message: false });
});

app.get('/registration', function (req, res) {
    res.render('registration.ejs', { question: "Short answer q", user: fakeUser, message: false });
});

app.get('/admin', function (req, res) {
    res.render('admin.ejs', { now: false, counts: {}, message: false, done: false, question: "Short answer q", user: fakeUser });
});

app.get('/register-confirmation', function (req, res) {
    res.render('manage-confirmation.ejs', { message: false, user: fakeUser });
});

app.get('/sponsorship', function (req, res) {
    res.render('sponsorship.ejs', { user: fakeUser, message: false });
});

app.get('/all-the-data', function (req, res) {
    res.render('all-the-data.ejs', {fields: Object.keys(fakeUser), excludes: ['you', 'your mum'], data: {type: "fake, as ever"}});
});

app.use("/waiver", express.static(__dirname + "/views/assets/hackru_f17_waiver.pdf"));
// Launch
var port = process.env.PORT || 9000;
app.listen(port);
console.log('Listening on port: %d', port);
