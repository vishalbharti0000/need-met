const User = require('../models/user.js');
const Project = require('../models/project.js');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { request } = require('express');


exports.getProjectById = (request,response,next,id) => {
    Project.findById(id).exec((error,proj) => {
        if(error || !proj){
            return response.status(404).json({
                error: "Project doesn't exist in database"
            });
        }
        request.project = proj;
        next();
    });
}

exports.createProject = (request, response) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(request, (error, fields, file) => {
        if(error){
            return response.status(300).json({
                error: "File is either too big or corrupted",
            });
        }
        const {name,description,projectPhoto} = fields;
        if(!name || !description){
            return response.status(400).json({
                error: "Please include all fields"
            })
        }
        let project = new Project(fields);
        project.freelan = request.profile._id;
        if(file.projectPhoto){
            if(file.projectPhoto.size > 4000000){
                return response.status(400).json({
                    error: "File Size too big"
                });
            }
            project.projectPhoto.data = fs.readFileSync(file.projectPhoto.path);
            project.projectPhoto.contentType = file.projectPhoto.type;
        }   
        
        project.save((error,project) => {
            if(error){
                return response.status(400).json({
                    error: "Saving project failed"
                });
            }
            response.json(project);
        })
    });
};

exports.getProject = (request,response) => {
    request.project.projectPhoto = undefined;
    return response.json(request.project);
}

exports.getProjectPhoto = (request, response, next) => {
    if(request.project.projectPhoto.data){
        response.set("Content-Type",request.project.projectPhoto.contentType);
        return response.send(request.project.projectPhoto.data);
    }
    next();
}

exports.updateProject = (request, response) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(request, (error, fields, file) => {
        if(error){
            return response.status(300).json({
                error: "File is either too big or corrupted",
            });
        }
        let project = request.project;
        project = _.extend(product, fields);
        if(file.projectPhoto){
            if(file.projectPhoto.size > 4000000){
                return response.status(400).json({
                    error: "File Size too big"
                });
            }
            project.projectPhoto.data = fs.readFileSync(file.projectPhoto.path);
            project.projectPhoto.contentType = file.projectPhoto.type;
        }   
        
        project.save((error,project) => {
            if(error){
                return response.status(400).json({
                    error: "Updating project failed"
                });
            }
            response.json(project);
        })
    });
}

exports.deleteProject = (request, response) => {
    const id = request.project._id;
    Project.findByIdAndDelete(id).exec((error, project) => {
        if(error){
            return response.status(400).json({
                error: `Failed to delete ${project.name}`
            });
        }
        response.json({
            message: `Successfully deleted ${project.name}`
        })
    });
}

exports.getAllProjects = (request, response) => {
    let sortBy = request.query.sortBy ? request.query.sortBy : _id;
    Project.find().sort([[sortBy,"asc"]]).select("-projectPhoto").exec((error,projects) => {
        if(error){
            return response.status(400).json({
                error: "No project found by this id"
            });
        }
        response.json(projects);
    });
}

exports.sortProjectsByPriority = (request,response) => {
    Project.find({freelan: request.profile._id}).sort([["priority",1]]).exec((error,projects) => {
        if(error){
            return response.status(401).json({
                error: "Not authorized",
            })
        }
        response.json(projects);
    })
}

exports.sortProjectsByDateDecreasing = (request,response) => {
    Project.find({freelan: request.profile._id}).sort([["createdAt",-1]]).exec((error,projects) => {
        if(error){
            return response.status(401).json({
                error: "Not authorized",
            })
        }
        response.json(projects);
    })
}