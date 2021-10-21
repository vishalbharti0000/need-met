const express = require('express');
const router = express.Router();

const {getProjectById,createProject,getProject,getProjectPhoto,updateProject,deleteProject,getAllProjects,sortProjectsByDateDecreasing,sortProjectsByPriority} = require('../controllers/project');
const {isSignedIn,isAuthenticated,isFreelancer} = require('../controllers/authentication');
const {getUserById} = require('../controllers/user');




//param
router.param('projectId', getProjectById);
router.param('userId',getUserById);

//routes
router.post('/user/:userId/project/create',isSignedIn,isAuthenticated,isFreelancer,createProject);

router.get('/user/project/:projectId/view',getProject);
router.get('/user/project/proj_photo/:projectId',getProjectPhoto);

router.put('/user/:userId/project/update/:projectId',isSignedIn,isAuthenticated,isFreelancer,updateProject);
router.delete('/user/:userId/project/delete/:projectId',isSignedIn,isAuthenticated,isFreelancer,deleteProject);

router.get('/user/:userId/project/all',isSignedIn,getAllProjects);
router.get('/user/:userId/project/view/sortedByDate',isSignedIn,sortProjectsByDateDecreasing);
router.get('/user/:userId/project/view/sortedByPriority',isSignedIn,isAuthenticated,isFreelancer,sortProjectsByPriority);
module.exports = router;