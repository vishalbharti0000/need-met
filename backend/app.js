require('dotenv').config();
var fs = require('fs');
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('./models/user.js');

const app = express();
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Custom Routes
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/taskPost');
const projectRoutes = require('./routes/project');


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log("DB connected");
    }
).catch(() => {
    console.log("Failure at .env file in backend");
});

// var multer = require('multer');
 
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });



//Middlewares
//app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(cors());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
  },
  function(req,accessToken, refreshToken, profile,done) {
      console.log("profile gg",profile);
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


//Routes
app.use(passport.initialize());
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',taskRoutes);
app.use('/api',projectRoutes);

//PORT
const port = process.env.PORT || 5000;



// app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'http://localhost:3000/auth/login'}),(req,res)=>{
//     res.redirect('http://localhost:3000/');
// });

//Starting a server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});
