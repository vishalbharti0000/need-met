import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {createProject,deleteProject,sortProjectsByDateDecreasing,sortByPriority,freelancerGetAllProjects} from './apicalls';
import {isAuthenticated} from './helper/index';

const Projects = () => {

    const {user,token} = isAuthenticated();
    const [projects,setProjects] = useState([]);
    const [values,setValues] = useState({
        name: "",
        description: "",
        priority: 0,
        projectPhoto: "",
        formData: new FormData(),
        createdProject: "",
        error: "",
        success: false,
    });

    /*
    preload all projects using useEffect 
    */
    const preloadProjects = () => {
        freelancerGetAllProjects(user._id).then((data) => {
            if(data && data.error){
                console.log(data.error);
            }else{
                setProjects(data);
            }
        }).catch(error => console.log(error));
    }
    //onClick = {addProjectOnSubmit}
    const addProjectOnSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error: false});
        createProject(user._id,token,values.formData).then(
            (data) => {
                if(data && data.error){
                    setValues({
                        ...values,
                        error: data.error,
                    })
                }else{
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        projectPhoto: "",
                        priority: 0,
                    });

                }
            }).catch(error => {
                console.log(error);
            });
    }

    
    /*onClick = {(event) => {
        event.preventDefault();
        deleteProjectOnSubmit(projectId);
    }}*/
    const deleteProjectOnSubmit = (projectId) => {
        deleteProject(projectId,user._id,token).then(
            //call preload useEffect
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    const handleChangeUpdation = (paramPassed) => (event) => {
        const value = (paramPassed === "projectPhoto" ? event.target.files[0] : event.target.value);
        (values.formData).set(paramPassed,value);
        setValues({...values, [paramPassed]: value });
    }

    const handleChangeCreation = (paramPassed) => (event) => {
        const value = (paramPassed === "projectPhoto" ? event.target.files[0] : event.target.value);
        (values.formData).set(paramPassed,value);
        setValues({...values, [paramPassed]: value });
    }

    const successMessage = () => {
        //show something based on success
        return (<div></div>)
    }

    const errorMessage = () => {
        //show something based on error
        return <div></div>
    }

    //inside form call onChange as handleChange(valueName)
    return (<div></div>);
};

//formData will be called inside useEffect as formData

export default Projects;

