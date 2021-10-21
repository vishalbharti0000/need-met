require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/user.js');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/secrets",
    passReqToCallback: true
  },
  function(req,accessToken, refreshToken, profile,done) {
      // Register user
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });
    User.findOne({
        'email': profile.emails[0].value,
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password : process.env.RANDOM_PASSWORD + profile.id,
                role:req.params.role,
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    });
        // console.log(profile);
        // done(null,profile);
  }
));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});