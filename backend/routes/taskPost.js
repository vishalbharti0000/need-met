const express = require('express');
const { isObjectLike } = require('lodash');
const router = express.Router();

const {isAuthenticated, isClient, isFreelancer, isSignedIn, userTaskList} = require('../controllers/authentication');
const {getTaskUsingId,getTasksbyUserid,createTaskPost,deleteTaskPost,updateTaskPost,delTaskPost,globalActiveTaskList,getTaskById, modifyTaskStatus,addFreelanTaskPost,acceptApplication,withdrawApplication} = require('../controllers/taskPost');
const {getUserById,getFreelancerById} = require('../controllers/user');


//param
router.param('taskId', getTaskById);
router.param('userId', getUserById);
router.param('freelancerId',getFreelancerById);

//routes
router.get('/user/:userId/task/active',isSignedIn,isFreelancer,globalActiveTaskList);
router.get('/user/tasks/:userId',isSignedIn,isAuthenticated,isClient,getTasksbyUserid);
router.post('/user/task/create/:userId', isSignedIn, isAuthenticated, isClient, createTaskPost);
router.get('/task/:taskId',getTaskUsingId);
router.put('/user/:userId/task/update/:taskId',isSignedIn,isAuthenticated,isClient,updateTaskPost);
router.put('/user/:userId/task/addUser/:taskId',isSignedIn,isAuthenticated,isFreelancer,addFreelanTaskPost);
router.delete('/user/:userId/task/delete/:taskId',isSignedIn,isAuthenticated,isClient,deleteTaskPost);
router.delete('/user/:userId/taskpost/:id',isSignedIn,isAuthenticated,isClient,delTaskPost);
router.put('/user/:userId/task/change_status/:taskId',isSignedIn,modifyTaskStatus);
router.put('/user/:userId/:freelancerId/apply_task/:taskId',isSignedIn,isAuthenticated,isClient,acceptApplication);
router.put('/user/:userId/withdraw_task/:taskId',isSignedIn,isAuthenticated,isFreelancer,withdrawApplication);
module.exports = router;