const { body, validationResult } = require('express-validator');
const User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var cookieParser = require('cookie-parser')
const crypto = require('crypto');
const uuidv4 = require("uuid/v4");

exports.logout = (request, response) => {
    response.clearCookie("token");
    response.json({
        message: "User logout",
    })
};

exports.signup = (request,response) => {
    
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param,
        });
    }
    console.log(request.body);
    User.findOne({email:request.email},(err,user)=>{
        if(user)
            return response.status(400).json({err:"User already exists with same email id"});
        const new_user = new User(request.body);
        new_user.save((error,savedUser)=>{
            if(error)
                return response.status(400).json({err:"Not able to save user in database"});
            response.json({
                name:savedUser.name,
                email:savedUser.email,
                id:savedUser._id
            });
        })
    })
};

exports.login = (request,response) => {

    const {email,password} = request.body;
    console.log("RECEIVED :", request.body);
    const errors = validationResult(request);
    console.log("yoo");
    if(!errors.isEmpty()){
        console.log("ERRORRRRRR!!! :",errors);
        return response.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param,
        });
    }

    User.findOne({ email }, (error, user) => {
        if(error || !user){
            //redirect to signup page
            return response.status(400).json({
                error: "User email doesn't exist, go to the signup page",
            });
        }

        if(!user.authenticate(password)){
            console.log("WP");
            return response.status(401).json({
                error: "Email and password provided do not match",
            });
        }
        //create token using jwt
        let token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        response.cookie("token", token, { expire: new Date() + 10000});

        //send cookie to frontend
        let {_id,name,email,role,projects,averageRating,proffesion} = user;
        console.log("Happy:",averageRating);
        return response.json(
            {
                token,
                user: { _id, name, email, role, projects, averageRating,proffesion},
            }
        );
    });
};

exports.gOauth = ('/auth/google',(request,response)=>{
    console.log(request);
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        console.log("ERRORRRRRR!!! :",errors);
        return response.status(422).json({
            error: errors.array()[0].msg,
            params: errors.array()[0].param,
        });
    }
    const{name,email,password}=request.body;
    User.findOne({
        'email': email,
    }, function(err, user) {
        if (err) {
            return response.status(422).json({error:err});
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User(request.body);
            user.save(function(err,data) {
                if (err) 
                    return res.status(422).json({error:"Request not processed !"});
                let token = jwt.sign({ _id: data._id }, process.env.SECRET);

                    //put token in cookie
                response.cookie("token", token, { expire: new Date() + 10000});
                let {_id,name,email,role,projects,averageRating,proffesion} = data;
                return response.json(
                    {
                        token,
                        user: { _id, name, email, role, projects, averageRating,proffesion},
                    }
                );

            });
        } else {
            //found user. Return
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);

                    //put token in cookie
            response.cookie("token", token, { expire: new Date() + 10000});
            let {_id,name,email,role,projects,averageRating,proffesion} = user;
            return response.json(
                {
                    token,
                    user: { _id, name, email, role, projects, averageRating,proffesion},
                }
            );
        }
    });
});


//Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
});

//Custom Middlewares

exports.isAuthenticated = (request, response, next) => {
    //console.log("Authenticated ");
    //console.log(request.profile);
    let checker = request.profile && request.auth && request.profile._id == request.auth._id;
    if(!checker){
        return response.status(403).json({
            error: "ACCESS DENIED",
        });
    }
    next();
};

exports.isClient = (request, response, next) => {
    //console.log("Client");
    if(request.profile.role === 1){
        return response.status(403).json({
            error: "Freelancer private pages not visible",
        })
    }
    next();
};

exports.isFreelancer = (request, response, next) => {
    if(request.profile.role === 0){
        return response.status(403).json({
            error: "Client private pages not visible",
        })
    }
    next();
};

exports.forgotPassword = (request,response) => {
    User.find({
        email: request.body.email,
    }).exec((error,user) => {
        if(error){
            return response.status(404).json({
                error: "Bad request, user doesn't exist in our database"
            })
        }
        response.json({
            message: "Search Successful"
        })
    })
}

exports.changePassword = (request, response) => {
    console.log(request.body);
    const newSalt = uuidv4();
    function securePwd(nonEncryptedPassword){
        if(!nonEncryptedPassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256', newSalt).update(nonEncryptedPassword).digest('hex');
        }catch(err){
            return "";
        }
    }
    const newEncryptedPassword = securePwd(request.body.password);
    User.findOneAndUpdate(
        {
            email: request.body.email,
        },
        {
            $set: 
            {
                password: request.body.password,
                encryptedPassword: newEncryptedPassword,
                salt: newSalt,
            },
        },
        {
            returnOriginal:false, useFindAndModify: false
        }
    ).exec((error,newUser) => {
        if(error){
            return response.status(404).json({
                error: "Unable to save new password"
            })
        }
        response.json(newUser);
        }
    );
}