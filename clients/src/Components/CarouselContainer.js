import React from 'react';
import "../Components/SassOrCss/ProfileExperience.css"
import ImageProjectHelper from '../auth/ImageProjectHelper'

function WithoutTime(nowDate) {
    var date = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();
    return date;
}

const CarouselContainer = (props) => {
    console.log(props)
    return (
        <>
            <div className="carouselContent justify-content-left align-items-left" >
                <h5 className="headers">{props.details.name}</h5>
                <h6 className="">{WithoutTime(new Date(props.details.createdAt)).toString()}</h6>
                <h5 className="projDesc">Project Description</h5>
                <p className="mt-2">{props.details.description}</p>
            </div>
            <ImageProjectHelper project={props.details}/>
            {/* <img
                style={{ width: '640px', height:"500px" }}
                className="d-block w-100"
                src={props.image}
                alt="Third slide"
            /> */}
        </>
    )
}

export default CarouselContainer;
