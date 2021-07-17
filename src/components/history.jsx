import React, { useState, useEffect } from 'react';
import './css/home.css';

import HomeIcon from '@material-ui/icons/Home';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';
import HistoryIcon from '@material-ui/icons/History';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListDetails from './itemDetails';
import { NavLink, useHistory } from 'react-router-dom';

import fire from 'firebase/app';
import 'firebase/firestore';



const HistoryUI = () => {

    const user = process.env.REACT_APP_DEMO_KEY;
    const routerHistory = useHistory();
    const [showMenu, setShowMenu] = useState(true);
    const [historylist, setHistoryList] = useState([]);

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getData = (user) => {

            const arr = [];

            fire.firestore().collection("Youtube_Web_App").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        arr.push(doc.data());
                    });

                    //delay by 2s for animations 
                    setTimeout(() => {
                        setLoading(false);
                        setHistoryList(arr);
                    }, 1000);

                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        }

        const checkUserState = () => {
            fire.auth().onAuthStateChanged((userAuth) => {
                if (userAuth) {
                    if (userAuth.email !== user) {
                        setTimeout(() => {
                            getData(userAuth.email);
                        }, 2000)
                    } else if (userAuth.email === user) {
                        setLoading(false);
                        alert("This Section Is Not For Guest And Go Back And Explore Other Sections");
                    }
                } else {
                    routerHistory.push("./welcome");
                }
            });
        }

        checkUserState();


    }, [routerHistory,]);



    const UserExit = () => {
        fire.auth().signOut().then(() => {
            routerHistory.push("./welcome");
        }).catch((error) => {
            console.log("error " + error);
        })
    }

    //create function for getting list



    const getText = (event) => {
        setSearch(event.target.value);
    }



    const navigation = (nav) => {
        routerHistory.push("./" + nav);
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
                                <YouTubeIcon style={{ color: "red", width: "4vh", height: "4vh", marginTop: "1vh" }} className="logo" onClick={() => { routerHistory.push("./") }} />
                                <p onClick={() => { routerHistory.push("./") }}>YouTube</p>
                            </div>

                        </div>

                        <div className="body_header">
                            <div className="div_search_bar">
                                <input className="search_area" placeholder="Filter Video" onChange={getText}>
                                </input>
                                <SearchIcon style={{
                                    width: "6vh", height: "4vh", color: "white"
                                }} className="search_btn" onClick={
                                    () => {
                                        //data
                                        if (search != null) {
                                            routerHistory.push("/search/" + search);
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
                            <div className="nav_item_show_home" onClick={() => { navigation("likeVideos") }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/likeVideos"}><ThumbUpAltIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/likeVideos"}><p>Liked Video</p></NavLink>
                            </div>
                            <div className="nav_item_show_home" style={{ backgroundColor: "gray", borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: 'white' }} onClick={() => { navigation("history") }}>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/history"}><HistoryIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh", color: "white" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/history"}><p>History</p></NavLink>
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
                            !historylist ? null : Object.keys(historylist).filter(id => {
                                let match = false;
                                if (search === "") {
                                    return historylist[id].title;
                                } else if (historylist[id].title.toLowerCase().includes(search.toLowerCase())) {
                                    match = true;
                                    return historylist[id].title;
                                }
                                return match;
                            }).map((id) => {
                                return (<ListDetails key={id} imgUrl={historylist[id].img} title={historylist[id].title} publish={historylist[id].publishAt} statistics={historylist[id].title} videoId={historylist[id].videoId} />)
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
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/likeVideos"}><ThumbUpAltIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/history"}><HistoryIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
            </div>
        </div>

    )
}

export default HistoryUI;