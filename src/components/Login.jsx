import React, { useState } from 'react';
import "./css/login.css";
import "./css/header.css";
import { useHistory } from 'react-router';
import firebase from 'firebase/app';
import 'firebase/auth';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { setUserState } from './UserState';


const LoginUI = () => {
    const history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassswod] = useState(null);
    const [failed, setfailed] = useState(true);
    //const [userState, setUserState] = useState(false);


    const passingUser = () => {
        history.push("/");
    }


    const checkAuthentication = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                setUserState(true);
                setfailed(true);
                var user = userCredential.user;
                console.log(user.message);
                passingUser();
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                console.log(error);
                setfailed(error.message);
                setUserState(false);
                console.log(error.message);
            });
    }

    const BuildUpGustAuthentication = () => {
        firebase.auth().signInWithEmailAndPassword(process.env.REACT_APP_DEMO_KEY, process.env.REACT_APP_DEMO_KEYS)
            .then((userCredential) => {
                // Signed in
                setUserState(true);
                setfailed(true);
                var user = userCredential.user;
                console.log(user.message);
                passingUser();
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                console.log(error);
                setfailed(error.message);
                setUserState(false);
                console.log(error.message);
            });
    }


    return (
        <div className="Root_Login">
            <div className="Header_Login">
                <div className="root_h">
                    <div className="image_h">
                        <div>
                            <YouTubeIcon style={{ color: "red", width: "4vh", height: "4vh", marginTop: "1vh" }} className="logo" />
                            <p>YouTube</p>
                        </div>

                        <div className="body_h">
                            <div className="div_search_bar">
                            </div>
                        </div>


                        <div className="UserS">

                        </div>

                    </div>
                </div>

                <div className="Main_page">

                    <div className="Login_Section">

                        <div className="Inner_Login_Section">
                            <div>
                                <p style={{ width: "auto", height: "auto", fontSize: "5.6vh", fontFamily: "'Oswald', sans-serif" }}> Welcome To Youtube Clone</p>
                                <p style={{ width: "auto", height: "auto", fontSize: "2vh", textAlign: "center" }}> This Youtube Clone For Eduction Perpose Only. <br></br> Authorised People Can Visit Only</p>
                                {<p style={{
                                    width: "auto", height: "auto", fontSize: "2vh", textAlign: "center", color: "red"
                                }}>{failed}</p>}
                                <br></br>
                                <input className="Input_Feild" type="text" placeholder="Email" onChange={(event) => {
                                    setEmail(event.target.value);
                                }}></input>
                                <br></br>
                                <input className="Input_Feild" type="password" placeholder="Password" onChange={(event) => {
                                    setPassswod(event.target.value);
                                }}></input>


                                <button className="LogIn_Btn" onClick={() => { checkAuthentication() }}>Log In</button>
                                <button className="Guest_Btn" onClick={() => { BuildUpGustAuthentication() }}>Guest / Demo</button>

                            </div>



                            <img className="character_img" src="https://pngimg.com/uploads/astronaut/astronaut_PNG41.png" alt="Loading Failed" ></img>

                        </div>

                        <span className="stars_One"></span>



                    </div>

                    <div className="Animation_Area">
                        <div className="Animation_inner_area">

                            <div className="background">
                                <div className="earth"></div>
                            </div>

                            <p style={{ width: "auto", height: "auto", color: "white", textAlign: "center", fontSize: "2vh", marginTop: "4vh", fontFamily: "'Oswald', sans-serif" }}>Design and Devloped By Surya Kant Sharma</p>

                            <span className="stars"></span>
                            <span className="stars"></span>
                            <span className="stars"></span>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )

}

export default LoginUI;