import React from 'react'
import pic from '../Images/pic.jpg';
const API = process.env.REACT_APP_BACKEND;
const ImageProfileHelper = ({user}) => {
    console.log("user: "+user);
    const imageurl = user.profilePhoto ? `${API}/user/${user._id}/profilePhoto` : "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageurl}
                alt={pic}
                // style={{ maxHeight: "100%", maxWidth: "100%" }}
                // className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageProfileHelper;