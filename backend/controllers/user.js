const User = require('../models/user.js');
const Project = require('../models/project.js');
const TaskPost = require('../models/taskPost.js');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { request } = require('express');
var ObjectId = require('mongodb').ObjectId;


exports.getUserById = (request, response, next, id) => {
    User.findById(id).exec( (error, user) => {
        if(error || !user){
            return response.status(422).json({
                error: "User doesn't exist/invalid request",
            });
        }
        request.profile = user;
        next();
    });
    
};

exports.deleteUser = (request, response) => {
    const user = request.profile;
    user.remove((error,userToDelete) => {
        if(error){
            return response.status(403).json({
                error: "Failed to delete user"
            });
        }
        response.json({
            message: `Deleted ${userToDelete.name} account`,
        })
    });
};

exports.getUser = (request, response) => {
    request.profile.salt = undefined;
    request.profile.encryptedPassword = undefined;
    request.profile.createdAt = undefined;
    request.profile.updatedAt = undefined;
    if(request.profile.role === 0){
        request.profile.project = undefined;
    }
    return response.json(request.profile);
};

exports.getProfilePhoto = (request, response, next) => {
    if(request.profile.profilePhoto.data){
        response.set("Content-Type",request.profile.profilePhoto.contentType);
        return response.send(request.profile.profilePhoto.data);
    }
    next();
};

exports.updateUser = (request,response) => {
    // User.findByIdAndUpdate(
    //     request.profile._id,
    //     {$set : request.body},
    //     { new : true,useFindAndModify : false},
    //     (error, user) => {
    //         if(error || !user){
    //             return response.status(400).json({
    //                 error: "You are not authorised here"
    //             })
    //         }
    //         user.salt = undefined;
    //         user.encryptedPassword = undefined;
    //         user.createdAt = undefined;
    //         user.updatedAt = undefined;
    //         response.json(user);
    //     }
    // );
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(request, (error, fields, file) => {
        if(error){
            return response.status(300).json({
                error: "File is either too big or corrupted",
            });
        }
        let user = request.profile;
        user = _.extend(user, fields);
        if(file.profilePhoto){
            if(file.profilePhoto.size > 4000000){
                return response.status(400).json({
                    error: "File Size too big"
                });
            }
            user.profilePhoto.data = fs.readFileSync(file.profilePhoto.path);
            user.profilePhoto.contentType = file.profilePhoto.type;
        }   
        
        user.save((error,user) => {
            if(error){
                return response.status(400).json({
                    error: "Updating project failed"
                });
            }
            response.json(user);
        })
    });
};

exports.userProjectList = (request, response) => {
    Project.find({
        user: request.profile._id
    }).populate("user", "_id name email").exec((error, projects) => {
        if(error){
            return response.status(400).json({
                error: "Not authorised to make changes",
            });
        }
        return response.json(projects);
    })
};

exports.userTaskList = (request, response) => {
    TaskPost.find({
        user: request.profile._id,
    })
    .populate("user", "_id name email")
    .exec((error, user) => {
        if(error){
            return response.status(403).json({
                error: "Not authorised to view this page",
            });
        }
        console.log("yolo");
        return response.json(task);
    });
};


//takes a project freelancer has completed and is pushed into his profile.
exports.pushProjectInUserPortfolio = (request, response, next) => {
    let projectListLocal = [];
    projectListLocal.push(request.body.project);
    User.findOneAndUpdate(
        {
            _id: request.profile._id,
        },
        {
            $push: {projects: projectListLocal},
        },
        {
            new: true,
        },
        (error, projectListLocal) => {
            if(error){
                return response.status(400).json({
                    error: "Unable to save new project in project list",
                });
            }
            next();
        }
    );
};

exports.getAllFreelancers = (request,response) => {
    User.find({role: 1}).exec((error,freelancers) => {
        if(error){
            return response.status(400).json({
                error: "Invalid request/No freelancer found"
            });
        }
        response.json(freelancers);
    });
};


exports.getFreelancerById = (request, response, next, id) => {
    User.findById(id).exec( (error, user) => {
        if(error || !user){
            return response.status(422).json({
                error: "User doesn't exist/invalid request",
            });
        }
        request.freelance = user;
        next();
    });
    
};

exports.getJobsApplied = (request,response)=>{
    TaskPost.find({'freelan':new ObjectId(request.profile._id)}).populate('user').populate('acceptedApplicant').exec((err,data)=>{
        if(err || !data){
            return response.status(422).json({error:"Invalid Request "});
        }
        return response.json(data);
    });
};

