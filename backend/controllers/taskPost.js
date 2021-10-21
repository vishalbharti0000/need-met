const TaskPost = require('../models/taskPost');
const Project = require('../models/project');
const {ObjectId} = require('mongodb');
const { request } = require('express');

exports.getTaskById = (request, response, next, id) => {
    TaskPost.findById(id).populate('freelan').populate('acceptedApplicant').exec( (error, taskPost) => {
        if(error || !taskPost){
            return response.status(422).json({
                error: "Task doesn't exist/invalid request",
            });
        }
        request.post = taskPost;
        next();
    });
};

exports.createTaskPost = (request, response) => {
    console.log(request.body);
    let newTaskPost = new TaskPost(request.body);
    newTaskPost.user = request.profile._id;
    newTaskPost.save((error,task) => {
        if(error){
            return response.status(400).json({
                error: "Unable to save task post"
            });
        }
        response.json({task});
    });
};

exports.getTasksbyUserid= (request, response) => {
    TaskPost.find ({ 'user': request.profile }).populate('freelan').populate('user').populate('acceptedApplicant').exec (function (err, tasks) {
        return response.json (tasks);
      });
};


exports.globalActiveTaskList = (request, response) => {
    TaskPost.find({
        $or: [
            {activeStatus: 1},
            {status: "Active"}
        ],
    }).populate('user').populate('freelan','_id').exec((error, activeTaskPosts) =>{
        if(error){
            return response.json({
                error: "Error occured",
            })
        }
        response.json(activeTaskPosts);
    }); 
};

exports.getTaskUsingId = (request, response) => {
    return response.json(request.post);
};

exports.getTasksAppliedById = (request,response)=>{
    TaskPost.find({freelan:ObjectId(request.profile._id)}).exec((err,jobs)=>{
        if(err)
            return response.json({error:"Error Occured"})
        response.json(jobs);    
    });
}

exports.modifyTaskStatus = (request, response) => {
    let activeStat = request.body.activeStatus;
    let stat = request.body.status;
    let freelancer = request.profile._id;
    if(activeStat === 1 || stat === "Active"){
        freelancer = "";
    }
    TaskPost.findOneAndUpdate(
        {
            _id: request.post._id, 
        },
        {
            $set: {
                activeStatus: activeStat,
                freelan: freelancer,
            }
        },
        {
            new: true,
        },
        (error, post) => {
            if(error){
                return response.status(400).json({
                    error: "Unable to save new project in project list",
                });
            }
            next();
        }
    );
};


exports.updateTaskPost = (request, response) => { 
    TaskPost.findByIdAndUpdate(
        request.post._id,
        {$set : request.body},
        { new : true,useFindAndModify : false},
        (error, user) => {
            if(error || !user){
                return response.status(400).json({
                    error: "Failed to update this task post"
                })
            }
            response.json(user);
        }
    );
};

exports.addFreelanTaskPost = (request,response)=>{
    console.log("request ",request);
    TaskPost.findByIdAndUpdate(
        request.post._id,
        {$push:{freelan:request.profile}},
        {new:true,useFindAndModify:false},
        (error,post)=>{
            if(error || !post)
                return response.status(400).json({error:"Apllication Failed"});
            response.json(post);
        }
    );
};

exports.delTaskPost=(request,response)=>{
    const {id}=request.params;
    console.log(id);
    TaskPost.deleteOne({_id:id},function(err){
        if(err){
            return response.status(403).json({
                error: "Failed to delete user"
            });   
        }
        response.json({message:`Deleted taspost with id : ${id}`});
    })
}

exports.deleteTaskPost = (request, response) => {
    const taskPost = request.post;
    taskPost.remove((error,userToDelete) => {
        if(error){
            return response.status(403).json({
                error: "Failed to delete user"
            });
        }
        response.json({
            message: `Deleted ${userToDelete.name} task posting from our site`,
        })
    });
};

exports.acceptApplication = (request,response) => {
    TaskPost.findByIdAndUpdate(request.post._id,
        {
            $set: 
            {
                acceptedApplicant: request.freelance,
                status: "3"
            }
        },
        {new: true,useFindAndModify: false},
        (error, task) => {
            if(error){
                return response.status(400).json({
                    error: "Failed to update database (add applicant)"
                });
            }
            response.json(task);
        }
    );
};

exports.withdrawApplication = (request,response)=>{
    console.log("INSIDE");
    console.log(request.post.status,request.post.acceptedApplicant._id,request.profile._id)
    if(request.post.status=="3" && request.post.acceptedApplicant && request.post.acceptedApplicant._id==request.profile._id){
        console.log(1222334);
    }
    // if(request.post.status=="3" && request.post.acceptedApplicant && request.post.acceptedApplicant._id==request.profile._id){
    //     console.log("Inside");
    //     TaskPost.findByIdAndUpdate(request.post._id,{
    //         $unset:{acceptedApplicant:"1"},
    //         $set:{status:"1"}
    //     },{
    //         new:true,useFindAndModify:false,
    //     },(error,task)=>{
    //         if(error)
    //             return response.status(400).json({error:"Withdraw Application"});
    //         console.log(task);
    //     })
    // }
    TaskPost.findOneAndUpdate({_id:request.post._id},{$pull:{'freelan':request.profile}},
    (error,task)=>{
        if(error){
            return response.status(400).json({
                error:"Failed to withdraw application"
            });
        }
        return response.json(task);
    }
    );
};