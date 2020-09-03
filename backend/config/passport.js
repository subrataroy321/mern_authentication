require('dotenv').config();


// A passport strategy for authenicating with a JSON Web Token
// This allows to authenicate endpoints using the token.
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
// const User = mongoose.model('User');

const options = {}
options.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findByid(jwt_payload.id)
        .then(user => {
            if (user) {
                // if user found return null error and user
                return done(null, user);
            } else {
                // if user not found send false
                return done(null, false);
            }
        })
        .catch(error => console.log(error));
    }));
}