import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from './helper/index';
import {deleteTaskPost,getAllApplicantsToTaskPost,acceptApplicationTaskPost,getAllActiveTaskPostClient} from './apicalls';

const TaskPostChanges = () => {
  const {userDetails,token} = isAuthenticated();
  const [applicants,setApplicants] = useState([]);
  const [tasks,setTasks] = useState([]);
  //dummy variable taskPostId
  const taskPostId = 0;

  //useEffect preloadApplicants

  const preloadApplicants = () => {
    getAllApplicantsToTaskPost(taskPostId,userDetails._id,token).then(
      (data) => {
        if(data && data.error){
          console.log(data.error);
        }else{
          setApplicants(data);
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }

  const preloadTasks = () => {
    getAllActiveTaskPostClient(userDetails._id,token).then(
      (data) => {
        if(data && data.error){
          console.log(data.error);
        }else{
          setTasks(data);
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  };


  /* call as onClick = {(event) => {
    event.preventDefault();
    onAcceptApplication(applicant._id);
  }}*/
  const onAcceptApplication = (freelancerId) => {
    acceptApplicationTaskPost(userDetails._id,freelancerId,token,taskPostId).then(
      (data) => {
        if(data && data.error){
          console.log(data.error);
        }else{
          //TODO:
          //show success message that this guy has been accepted
          setApplicants([]);
          //one has been accepted rest rejected
          
          //change depending on how you see fit
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }


  /* call as onClick = {(event) => {
    event.preventDefault();
    onDeleteTaskPost(taskPost._id);
  }}*/
  const onDeleteTaskPost = (taskPostId) => {
    deleteTaskPost(userDetails._id,token,taskPostId).then(
      data => {
        if(data && data.error){
          console.log(data.error);
        }else{
          //remove taskPost Id here
          //TODO
          preloadTasks();
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }
  return (<div></div>)
}

export default TaskPostChanges;
