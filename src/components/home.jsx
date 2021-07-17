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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink, useHistory } from 'react-router-dom';
import fire from 'firebase/app';


function HomeUI({ match }) {

    const routerHistory = useHistory();
    const [showMenu, setShowMenu] = useState(true);
    const [data, setData] = useState([]);
    const [text, setText] = useState(null);
    const [nxtToken, setNxtToken] = useState('');

    //button 
    const [loading, setLoading] = useState(true);
    //const [trending, setTrending] = useState(false);



    useEffect(() => {

        if (match.params.keyword != null) {
            setText(match.params.keyword);
            setTimeout(() => {
                SearchVideoWithKeyword(match.params.keyword)
            }, 2000)
        }

        const SearchVideoWithKeyword = async (keyword) => {
            const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${keyword}&key=${process.env.REACT_APP_API_KEY}`
            fetch(url).then((response) => {
                return response.json()
            }).then((result) => {
                setData(result.items);
                setNxtToken(result.nextPageToken);
                setLoading(false);
            }).then((jsonResponse) => {

            }).catch((error) => {
                console.log(error);
            })

        }


        const SearchVideo = async () => {

            const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${(!text) ? () => { setText("World News") } : text}&key=${process.env.REACT_APP_API_KEY}`
            fetch(url).then((response) => {
                return response.json()
            }).then((result) => {
                setData(result.items);
                setNxtToken(result.nextPageToken);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })

        }


        const checkUserState = () => {
            fire.auth().onAuthStateChanged((userAuth) => {
                if (userAuth) {
                    //Nothing to do here till now
                } else {
                    routerHistory.push("./welcome");
                }
            });
        }

        checkUserState();

        setTimeout(() => {
            if (match.params.keyword == null) {
                SearchVideo();
            }
        }, 2000)
    }, [routerHistory, match.params.keywordclear]);

    const SearchVideo = async () => {

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${(!text) ? () => { setText("World News") } : text}&key=${process.env.REACT_APP_API_KEY}`
        fetch(url).then((response) => {
            return response.json()
        }).then((result) => {
            setData(result.items);
            setNxtToken(result.nextPageToken);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })

    }

    //herer Methods 

    const getText = (event) => {
        setText(event.target.value);
        if (event.keyCode === 13) {
            console.log(event.target.value);
        }

    }

    const UserExit = () => {
        fire.auth().signOut().then(() => {
            routerHistory.push("./welcome");
        }).catch((error) => {
            console.log("error " + error);
        })
    }

    const trigerSearch = (e) => {
        if (e.keyCode === 13) {
            SearchVideo();
        }
    }

    const SearchNextVideo = async (next) => {

        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&pageToken=${next}&q=${text}&key=${process.env.REACT_APP_API_KEY}`

        console.log("next call " + next);
        fetch(url).then((response) => {
            return response.json()
        }).then((result) => {
            setNxtToken(result.nextPageToken);
            result.items.forEach(element => {
                setData((pre) => {
                    return [...pre, element]
                })
            });
        }).catch((error) => {
            console.log(error);
        })

    }

    const navigation = (nav) => {
        routerHistory.push("./" + nav);
    }



    return (
        <div style={{ width: "100%", height: "auto" }}>
            <div className="root_home">
                <div className="header_home">
                    <div className="root_header">
                        <div className="image_header">
                            <div>
                                <MenuIcon className="menulogo" onClick={() => {
                                    setShowMenu(!showMenu);
                                }} style={{ width: "4vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} />
                                <YouTubeIcon style={{ color: "red", width: "4vh", height: "4vh", marginTop: "1vh" }} className="logo" onClick={() => { routerHistory.push("./") }} />
                                <p onClick={() => { routerHistory.push("./") }}>YouTube</p>
                            </div>

                        </div>

                        <div className="body_header">
                            <div className="div_search_bar">
                                <input className="search_area" onChange={getText} onKeyDown={trigerSearch} placeholder={(!text) ? "world news" : text}></input>
                                <SearchIcon style={{
                                    width: "6vh", height: "4vh", color: "white"
                                }} className="search_btn" onClick={
                                    () => {
                                        //data
                                        SearchVideo()
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
                            <div className="nav_item_show_home" style={{ backgroundColor: "gray", borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: 'white' }} onClick={() => { navigation("") }}>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/"}><HomeIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh", color: "white" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/"}><p>Home</p></NavLink>
                            </div>
                            <div className="nav_item_show_home" onClick={() => { navigation("trending") }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/trending"}><TrendingUpIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/trending"}><p>Trending</p></NavLink>
                            </div>
                            <div className="nav_item_show_home" onClick={() => { navigation("likeVideos") }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/likeVideos"}><ThumbUpAltIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/likeVideos"}><p>Liked Video</p></NavLink>
                            </div>
                            <div className="nav_item_show_home" onClick={() => { navigation("history") }} >
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
                            <InfiniteScroll className="right_child_infinity_scrolling" dataLength={(!data) ? 0 : data.length} next={() => { SearchNextVideo(nxtToken) }} hasMore={true} >
                                {
                                    !data ? <p style={{ textAlign: "center", width: "100%", height: "50%", fontFamily: "'Oswald', sans-serif" }}>Quota Exceeded</p>
                                        : data.map((value, i) => {
                                            return (<ListDetails key={i} imgUrl={value.snippet.thumbnails.high.url} title={value.snippet.title} publish={value.snippet.publishedAt} statistics={(value.snippet.liveBroadcastContent === "upcoming") ? "Channel" : value.snippet.channelTitle} videoId={value.id.videoId} />)
                                        })
                                }
                            </InfiniteScroll>
                        }



                    </div>

                </div>
            </div>
            <div className="bottom_nav">
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/"}><HomeIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/trending"}><TrendingUpIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/likeVideos"}><ThumbUpAltIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/history"}><HistoryIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
            </div>
        </div>
    )
}

export default HomeUI;