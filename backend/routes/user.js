const express = require('express');
const router = express.Router();

const {isAuthenticated, isClient, isFreelancer, isSignedIn} = require('../controllers/authentication');
const { getUserById,getUser,updateUser,userProjectList,userTaskList,deleteUser,getAllFreelancers,getProfilePhoto,getJobsApplied } = require('../controllers/user');

router.param('userId', getUserById);

router.get('/user/:userId',isSignedIn, getUser);
router.get('/user/:userId/profilePhoto',getProfilePhoto);

router.put('/user/:userId/update', isSignedIn, isAuthenticated, updateUser);

router.get('/user/:userId/freelancers',isSignedIn,isClient,getAllFreelancers);

router.get('/user/client/tasks/:userId', isSignedIn, isAuthenticated, isClient, userTaskList);

router.get('/user/freelancer/project/:userId', isSignedIn, userProjectList);

router.delete('/user/:userId/delete_account', isSignedIn, isAuthenticated, deleteUser);

router.get('/user/:userId/jobs',isSignedIn,isAuthenticated,isFreelancer,getJobsApplied);

module.exports = router;