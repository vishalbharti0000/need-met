import './SassOrCss/sidebar.css';
import React,{useState} from 'react';
import {createProject,deleteProject} from '../auth/apicalls';
import {isAuthenticated} from '../auth/helper/index';


function AddProject(props) {
    const {user,token} = isAuthenticated();
    const [values,setValues] = useState({
        name: "",
        description: "",
        priority: 1,
        projectPhoto: "",
        formData: new FormData(),
        createdProject: "",
        getRedirect: false,
        error: "",
        success: false,
    });

     const {name,description, projectPhoto, priority,formData,createdProject,getRedirect,error,success} = values;

    const handleChangeProject = name => event => {
        const dataGiven = (name === "projectPhoto" ? event.target.files[0] : event.target.value);
        formData.set(name,dataGiven);
        setValues({...values,[name]: event.target.value});
    }
    const onSubmitProject = (event) => {
        event.preventDefault();
        setValues({...values,error: false})
        createProject(user._id,token,formData).then(
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
                        formData: new FormData(),
                        priority: 0,
                    });

                }
            }).catch(error => {
                console.log(error);
            });
    }
    const onSubmitDeleteProject = (event) => {
        event.preventDefault();
        setValues({...values,error: false})
        deleteProject(user._id,token,formData).then(
            (data) => {
                if(data.error){
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

  return (
    <div className="">
      <div className="row ">
                <div 
                className="mt-0 pt-2  text-left justify-content-top"
                >
                    <p><button class="btn btn-light edit-profile-button" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="40" height="20"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"></path></svg>
                      Add Project Info
                    </button></p>
                    <div className="collapse " id="collapseExample2">
                    <form className="">
                        <div className = "form-group">
                            <label className="">Project Name</label>
                            <input className="form-control mb-3"
                            onChange = {handleChangeProject("name")} 
                            type="text" 
                            placeholder="Project Name"
                            value={name} />
                        </div>
                        <div className = "form-group">
                            <label className="">Description</label>
                            <textarea className="form-control mb-3"
                            onChange = {handleChangeProject("description")}
                            type="text"
                            placeholder="Write Few Lines About Your Project"
                            value={description} />
                        </div>
                        <div className="form-group">
                            Project Photo
                            <input className="form-control mb-3"
                            onChange = {handleChangeProject("projectPhoto")}
                            type="file" name="picture"
                            placeholder="edit profile pic"
                            value={projectPhoto} />
                        </div>
                        <div className = "form-group">
                            <label className="">Priority of Your Project</label>
                            <input className="form-control mb-3"
                            onChange = {handleChangeProject("priority")}
                            type="number"
                            min="1"
                            placeholder="Set Priority of this project example(1 or 2)"
                            defaultValue="1"
                            value={priority} />
                        </div>
                        <button 
                        className="btn btn-success btn-block text-light mt-3"
                        onClick={onSubmitProject}
                        >
                            Confirm
                        </button>
                    </form>
                    </div>
                </div>
                    

                
    </div>
  </div>
  );
}

export default AddProject;
