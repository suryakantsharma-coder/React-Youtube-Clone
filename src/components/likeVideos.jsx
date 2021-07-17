import React, { useState, useEffect } from 'react';
import "./css/home.css";
import ListDetails from "./itemDetails";
import HomeIcon from '@material-ui/icons/Home';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

//header

import "./css/header.css";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';
import HistoryIcon from '@material-ui/icons/History';


import { NavLink, useHistory } from 'react-router-dom';
import fire from 'firebase/app';
import 'firebase/firestore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const LikedVideoUI = () => {
    const user = process.env.REACT_APP_DEMO_KEY;
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [showMenu, setShowMenu] = useState(true);
    const [likedVideoList, setLikeVideoList] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const checkUserState = () => {
            fire.auth().onAuthStateChanged((userAuth) => {
                if (userAuth) {
                    console.log("User Login : true");
                    console.log();
                    if (userAuth.email !== user) {
                        setTimeout(() => {
                            getData(userAuth.email);
                        }, 2000)
                    } else if (userAuth.email === user) {
                        setLoading(false);
                        alert("This Section Is Not For Guest And Go Back And Explore Other Sections");
                    }
                } else {
                    console.log("User Login : false");
                    history.push("./welcome");
                }
            });
        }


        checkUserState();

        const getData = (user) => {

            const arr = [];

            fire.firestore().collection(user).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        arr.push(doc.data());
                    });
                    //delay by 2s for animations 
                    setTimeout(() => {
                        setLoading(false);
                        setLikeVideoList(arr);
                    }, 1000);

                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });


        }




    }, [history]);



    const passingUser = () => {
        history.push("./welcome");
    }

    const UserExit = () => {
        fire.auth().signOut().then(() => {
            passingUser();
        }).catch((error) => {
            console.log("error " + error);
        })
    }




    const getTextFromInput = (event) => {
        setSearch(event.target.value);
    }

    const setEventTriggered = (e) => {
        if (e.keyCode === 13) {
            if (search != null) {
                history.push("/search/" + search);
            }
        }
    }



    const navigation = (nav) => {
        history.push("./" + nav);
    }


    return (
        <div>

            <div className="root_home">
                <div className="header_home">
                    <div className="root_header">
                        <div className="image_header">
                            <div>
                                <MenuIcon onClick={() => {
                                    setShowMenu(!showMenu);
                                }} style={{ width: "4vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} />
                                <YouTubeIcon style={{ color: "red", width: "4vh", height: "4vh", marginTop: "1vh" }} className="logo" onClick={() => { history.push("./") }} />
                                <p onClick={() => { history.push("./") }}>YouTube</p>
                            </div>

                        </div>

                        <div className="body_header">
                            <div className="div_search_bar">
                                <input className="search_area" placeholder="Search Video" onChange={getTextFromInput} onKeyDown={setEventTriggered} >
                                </input>
                                <SearchIcon style={{
                                    width: "6vh", height: "4vh", color: "white"
                                }} className="search_btn" onClick={
                                    () => {
                                        //data
                                        if (search != null) {
                                            history.push("/search/" + search);
                                        }
                                    }
                                } />

                            </div>
                        </div>


                        <div className="UserSection">
                            <ExitToAppIcon style={{ color: "red", width: "4vh", height: "4vh", marginRight: "2vh" }} onClick={() => { UserExit() }} />
                        </div>

                    </div>


                </div>

                <div className="body_home">

                    {
                        !showMenu ? null : <div className="left_child_home">
                            <div className="nav_item_show_home" onClick={() => { navigation("") }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/"}><HomeIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/"}><p>Home</p></NavLink>
                            </div>
                            <div className="nav_item_show_home" onClick={() => { navigation("trending") }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/trending"}><TrendingUpIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/trending"}><p>Trending</p></NavLink>
                            </div>
                            <div className="nav_item_show_home" style={{ backgroundColor: "gray", borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: 'white' }} onClick={() => { navigation("likeVideos") }}>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/likeVideos"}><ThumbUpAltIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/likeVideos"}><p>Liked Video</p ></NavLink>
                            </div>
                            <div className="nav_item_show_home" onClick={() => { navigation("history") }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/history"}><HistoryIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/history"}><p>History</p></NavLink>
                            </div>

                        </div>

                    }

                    <div className="right_child_home" >

                        {
                            !loading ? null : <div className="loading_div">
                                <div className="upperLayer">
                                    <p className="text" style={{ wordSpacing: "45px" }} >Loading...</p>
                                    <div className="hide_text"></div>
                                </div>
                            </div>
                        }

                        {


                            !likedVideoList ? null : Object.keys(likedVideoList).filter(id => {
                                let match = false;
                                if (search === "") {
                                    return likedVideoList[id].title;
                                } else if (likedVideoList[id].title.toLowerCase().includes(search.toLowerCase())) {
                                    match = true;
                                    return likedVideoList[id].title;
                                }
                                return match;
                            }).map((id) => {
                                return (<ListDetails key={id} imgUrl={likedVideoList[id].thumbnails} title={likedVideoList[id].title} publish={likedVideoList[id].publishAt} statistics={likedVideoList[id].title} videoId={likedVideoList[id].videoId} />)
                            })



                        }

                    </div>

                </div>
            </div>


            <div className="bottom_nav">
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/"}><HomeIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/trending"}><TrendingUpIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/likeVideos"}><ThumbUpAltIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/history"}><HistoryIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
            </div>
        </div>


    )
}

export default LikedVideoUI;