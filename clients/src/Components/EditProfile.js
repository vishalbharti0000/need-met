import React,{useState,useContext} from 'react';
import {UserContext} from "../App";
import { isAuthenticated } from '../auth/helper';
import { updateUser } from '../auth/apicalls';
import ImageHelper from '../auth/ImageProfileHelper';
const API = process.env.REACT_APP_BACKEND;


function EditProfile(props) {
    //console.log("props setusrr",props);
    console.log("jwts",localStorage.getItem("jwt"))
    const {state,dispatch} = useContext(UserContext);
    const [values, setValues] = useState({
        name: "",
        profession: "",
        summary: "",
        profilePhoto: "",
        formData: new FormData(),
        updatedUser: "",
        getRedirect: false,
        error: "",
        success: false,
    });
    const {user,token} = isAuthenticated();

    const {name, profession, summary, profilePhoto, formData,updatedUser, getRedirect,error,success} = values;

    const handleChange = name => event => {
        const dataGiven = (name === "profilePhoto" ? event.target.files[0] : event.target.value);
        formData.set(name,dataGiven);
        setValues({...values,[name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error: false})
        updateUser(user._id,token,formData).then(
            (data) => {
                if(data && data.error){
                    setValues({
                        ...values,
                        error: data.error,
                    })
                }else{
                    dispatch({ type: "USER", payload: data })
                    const tempData=JSON.parse(localStorage.getItem("jwt"));
                    localStorage.removeItem("jwt");
                    let {
                        email ,
                        name ,
                        profession ,
                        role ,
                        _id
                    } = data
                    tempData['user']={
                        email ,
                        name ,
                        profession ,
                        role ,
                        _id
                    }
                    localStorage.setItem("jwt",JSON.stringify(tempData));

                    setValues({
                        ...values,
                        name: "",
                        profession: "",
                        summary: "",
                        profilePhoto: "",
                        formData: new FormData(),
                    });
                    console.log("EDIT",values);
                }
            }).catch(error => {
                console.log(error);
            });
    }

  return (
    <div className="">
      <div className="row ">
                <div 
                className="mt-2 pt-0 text-left justify-content-top"
                >
                    <p><button class="btn btn-light edit-profile-button" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="20"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>
                      Edit Personal Info
                    </button></p>
                    <div className="collapse " id="collapseExample1">
                    <form className="">
                        <div className = "form-group">
                            <label className="">Name</label>
                            <input className="form-control mb-3"
                            onChange = {handleChange("name")} 
                            type="text" 
                            placeholder="Name"
                            value={name} />
                        </div>
                        <div className = "form-group">
                            <label className="">Edit Proffesion</label>
                            <input className="form-control mb-3"
                            onChange = {handleChange("profession")}
                            type="text" 
                            placeholder="Your Proffesion"
                            value={profession} />
                        </div>
                        <div className = "form-group">
                            <label className="">Edit Summary</label>
                            <textarea className="form-control mb-3"
                            onChange = {handleChange("summary")}
                            type="text"
                            placeholder="Create New Summary"
                            value={summary} />
                        </div>
                        <div className="form-group">
                            Edit Profile Pic
                            <input className="form-control mb-3" onChange = {handleChange("profilePhoto")} type="file" name="picture" placeholder="edit profile pic" value={profilePhoto} />
                        </div> 
                        <button 
                        onClick={onSubmit}
                        className="btn btn-success btn-block text-light mt-3"
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

export default EditProfile;