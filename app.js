const express = require ('express');
const path = require ('path');
const bodyParser = require('body-parser');
const cors = require ('cors');
const passport = require ('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log(`connected to dabase ${config.database}`);
})


const app = express();
const users = require('./routes/users');
const port = 3000;


//Cors middleware
app.use(cors());

//Set static folder

app.use(express.static(path.join(__dirname, 'client')));

//body parserm middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);



app.use('/users',users);

app.get('/', (req, res) => {
    res.send('invalid endpoint!');
});


app.listen(port, () => {
    console.log(`server started on port:  ${port} `);
});
