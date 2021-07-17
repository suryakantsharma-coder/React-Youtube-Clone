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

import ListDetails from './itemDetailsTrending';
import { NavLink } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import { useHistory } from 'react-router';
import fire from 'firebase/app';



const HistoryUI = () => {
    const history = useHistory();
    const [search, setSearch] = useState(null);
    const [showMenu, setShowMenu] = useState(true);
    const [trendinglist, setTrendingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nxtToken, setNxtToken] = useState('');


    useEffect(() => {
        const checkUserState = () => {

            fire.auth().onAuthStateChanged((userAuth) => {
                if (userAuth) {
                    //Nothing to do here till now
                } else {
                    history.push("./welcome");
                }
            });
        }


        checkUserState();


        const getData = async () => {
            const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${process.env.REACT_APP_API_KEY}`
            const response = await fetch(url);
            const result = await response.json();


            //delay by 2s for animation

            setTimeout(() => {
                setLoading(false);
                setNxtToken(result.nextPageToken);
                setTrendingList(result.items);
            }, 1000);

        }

        getData();


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


    //create get data and enter triggered function 

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


    //create function for getting list


    const getNextData = async (next) => {

        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&pageToken=${next}&regionCode=IN&key=${process.env.REACT_APP_API_KEY}`
        const response = await fetch(url);
        const result = await response.json();
        setNxtToken(result.nextPageToken);
        result.items.forEach(element => {
            setTrendingList((pre) => {
                return [...pre, element]
            })
        })

    }


    const navigation = (nav) => {
        history.push("./" + nav);
    }




    return (
        <div style={{ width: "100%", height: "auto" }}>

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
                            <div className="nav_item_show_home" style={{ backgroundColor: "gray", borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: 'white' }} onClick={() => { navigation("trending") }}>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/trending"}><TrendingUpIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh", color: "white" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/trending"}><p>Trending</p></NavLink>
                            </div>
                            <div className="nav_item_show_home" onClick={() => { navigation("likeVideos") }}>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/likeVideos"}><ThumbUpAltIcon className="homeIcon" style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                                <NavLink style={{ textDecoration: "none", color: "black" }} exact to={"/likeVideos"}><p>Liked Video</p></NavLink>
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
                            <InfiniteScroll className="right_child_infinity_scrolling" dataLength={(!trendinglist) ? 0 : trendinglist.length} next={() => { getNextData(nxtToken) }} hasMore={true} >
                                {
                                    !trendinglist ? <p style={{ textAlign: "center", width: "100%", height: "50%", fontFamily: "'Oswald', sans-serif" }}>Quota Exceeded</p>
                                        : trendinglist.map((value, i) => {
                                            return (<ListDetails key={i} imgUrl={value.snippet.thumbnails.high.url} title={value.snippet.title} publish={value.snippet.publishedAt} statistics={value.statistics.viewCount} videoId={value.id} />)
                                        })
                                }
                            </InfiniteScroll>
                        }

                    </div>

                </div>
            </div>

            <div className="bottom_nav">
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "rgb(196, 193, 193)" }} exact to={"/"}><HomeIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
                </div>
                <div className="bar_icons">
                    <NavLink style={{ textDecoration: "none", color: "white" }} exact to={"/trending"}><TrendingUpIcon style={{ width: "3vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} /></NavLink>
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

export default HistoryUI;