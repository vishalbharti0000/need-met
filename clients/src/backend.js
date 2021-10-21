require('dotenv').config();
const API=process.env.REACT_APP_BACKEND;
const PASSWORD=process.env.REACT_APP_RANDOM_PASSWORD;
const GOOGLE_CLIENT_ID=process.env.REACT_APP_GOOGLE_CLIENT_ID;

module.exports={API,PASSWORD,GOOGLE_CLIENT_ID};