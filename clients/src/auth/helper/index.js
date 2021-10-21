import {API,PASSWORD} from "../../backend.js";

export const signup = user => {
    console.log("SIGNUP USER",user);
    return fetch(`${API}/auth/signup`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
    return fetch(`${API}/auth/login`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const googleauth = user =>{
    console.log(PASSWORD);
    return fetch(`${API}/google`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
    }).then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
};

export const authenticate = (data,next) => {
    if(typeof window!==undefined){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const signout = next => {
    if(typeof window!==undefined){
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`,{
            method: "GET",
        }).then(response => console.log("signout success")).catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}

export const changePassword = (email,password) => {
    return fetch(`${API}/auth/change_password`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    });
};

export const forgotPassword = (email) => {
    console.log("email: "+email);
    return fetch(`${API}/auth/forgot_password`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
        })
    });
};