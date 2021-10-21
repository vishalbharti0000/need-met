import React,{createContext,useEffect,useReducer,useContext} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Redirect, Route,Switch } from "react-router";
import "./App.css";
import Home from "./Screens/Home";
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import Review from "./Screens/Review";
import Navbar from "./Components/Navbar";
import Signup from "./Screens/Signup";
import SignupForm from './Screens/SignupForm';
import SearchPage from './Screens/SearchPage';
import ProfilePage from './Screens/ProfilePage';
import LogIn from './Screens/Login';
import Logout from './Screens/Logout';
import { BrowserRouter,useHistory,Link } from "react-router-dom";
import Posting from "./Screens/Posting";
import {reducer,initialState} from "./Reducers/userReducer";
import TrackApplication from './Screens/TrackApplication';
import TrackJobs from './Screens/TrackJobs';
import EmailVerifiedSignup from './Screens/EmailVerifiedSignup';
import ForgotPassword from './Screens/ForgotPwd';
import Front from './Screens/Front';

export const UserContext = createContext();

const Routing = ()=>{
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext);
     useEffect(()=>{
        const usr = JSON.parse(localStorage.getItem("jwt"));
        if(usr){
                const user = usr.user;
                dispatch({type:"USER",payload:user});
                // console.log("USER :",user);
                if(user.role===1){
                    if(history.location.pathname.startsWith('/signinID/client/searchpage'))
                        history.push('/posting');
                    if(history.location.pathname.startsWith('/client/jobs'))
                        history.push('/posting');
                    if(history.location.pathname.startsWith('/login'))
                        history.push('/posting');
                    if(history.location.pathname.startsWith('/signup'))
                        history.push('/posting');
                }
                if(user.role==0)
                {
                    if(history.location.pathname.startsWith('/freelan/apply/'))
                        history.push('/signinID/client/searchpage');
                    if(history.location.pathname.startsWith('/profile'))
                        history.push('/signinID/client/searchpage');
                    if(history.location.pathname.startsWith('/login'))
                        history.push('/signinID/client/searchpage');
                    if(history.location.pathname.startsWith('/signup'))
                        history.push('/signinID/client/searchpage');
                }
        }else{
            //if(!history.location.pathname.startsWith('/auth/google'))
            history.push("/");
        }
    },[])
    return (
        <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/review" component={Review} />
                <Route exact path="/posting" component={Posting} />
                <Route exact path="/signup"><Signup usage="Signup" /></Route>
                <Route exact path="/login"><Signup usage="Login" /></Route>
                <Route exact path="/logout" component={Logout}></Route>
                <Route exact path="/jobStatus/:id" component={TrackJobs}></Route>
                <Route path="/auth/signup/:role" component={EmailVerifiedSignup}></Route>
                <Route path="/auth/login/:role" component={LogIn}></Route>
                <Route exact path="/signinID/client/searchpage" component={SearchPage}></Route>
                <Route exact path="/signinID/freelan/profile/:id" component={ProfilePage}></Route>
                <Route exact path='/profile' component={ProfilePage}></Route>
                <Route exact path='/forgotpassword' component={ForgotPassword}></Route>
                {/* <Route exact path='/client/jobs' component={TrackJobs}></Route> */}
                <Route exact path='/aboutus' component={Front}></Route>
                <Route exact path="/freelan/apply" component={TrackApplication}></Route>
                <Redirect to="/" />
            </Switch>
    )
}

function App() {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (
        <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
            <Navbar />
            <Routing />
            {/* <Link to="/GoogleLogin">Link</Link> */}
        </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;