import React from 'react'
//import { Link } from 'react-router-dom'
import {API} from '../backend.js';
//import SignupForm from 
import {Link} from 'react-router-dom';

export default function Card(props) {
    let dir,mute,disp;
    if (props.usage==="Login"){
        dir="/auth/login/"+props.para;
        mute="/signup/";
        disp="Don't";
    }
    else{
        dir="/auth/signup/"+props.para;
        mute="/login/";
        disp="Already";
    }
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">For {props.title}</h5>
                    <p className="card-text">{props.content}</p>
                    <Link to={dir}>
                    <button type="button" className="btn btn-primary" id="signup">{props.usage}</button><br/><br/>
                    </Link>
                    <h8 className="card-subtitle mb-2 text-muted">{disp} have an account ?&nbsp;<Link to={mute}>{props.not_usage}</Link></h8>
                </div>
            </div>
        </div>
    )
}
