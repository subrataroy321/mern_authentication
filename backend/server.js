require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const passport = require('passport');

const users = require('./routes/api/users')

// middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// passport middleware
app.use(passport.initialize());
//inporting passport file into server
require('./config/passport')(passport);



// <<<<<<< SERVER HOME ROUTE >>>>>>>>>>
app.get('/', (req,res)=> {
    res.status(200).json({message: 'Smile, You are being watched by the Backend Team.'});
});

app.use('/api/users', users)

app.listen(port, () => {
    console.log(`You are listening smooth to port ${port}`);
});