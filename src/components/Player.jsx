import React, { useEffect, useState } from 'react';
import "./css/player.css"
import YouTubePlayer from 'react-player';
import ListDetail from './itemDetails';
import Comments from './commentList';

import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import YouTubeIcon from '@material-ui/icons/YouTube';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';

import { useHistory } from 'react-router-dom';
import fire from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';


const PlayerUI = ({ match }) => {

    const history = useHistory();

    const [search, setSearch] = useState(null);
    const [showDescription, setShowDesription] = useState(false);
    const [color, setColor] = useState("black");
    const [showComments, setShowComments] = useState(true);
    const [likeEmails, setLikeEmails] = useState('');
    const [data, setData] = useState('');
    const [comment, setComments] = useState('');
    const [statisticslist, setStatisticslist] = useState('');


    useEffect(() => {




        const getStatistics = () => {

            const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${match.params.vid}&key=${process.env.REACT_APP_API_KEY}`;

            fetch(url).then((response) => {
                return response.json();
            }).then((result) => {
                setStatisticslist(result.items);
            }).catch(e => {
                console.log("Error : " + e);
            });

        }

        const getRelatedVideo = async () => {
            const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&${match.params.vid}=Ks-_Mh1QhMc&type=video&key=${process.env.REACT_APP_API_KEY}`;
            fetch(url).then((response) => {
                return response.json();
            }).then((result) => {
                setData(result.items);
            }).catch((error) => {
                console.log(error);
            })


        }


        const getComments = async () => {
            const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=40&textFormat=plainText&videoId=${match.params.vid}&key=AIzaSyAsTX9Qff792WkWZd_Ypp05sE-yaE4m04U`
            fetch(url).then((response) => {
                return response.json();
            }).then((result) => {
                setComments(result.items);
            }).catch((error) => {
                console.log(error);
            })

        }


        const checkUserState = () => {
            fire.auth().onAuthStateChanged((userAuth) => {
                if (userAuth) {

                    //if user anailable then 
                    setTimeout(() => {
                        getStatistics();

                        setTimeout(() => {
                            getComments();

                            // setTimeout(() => {
                            //     getRelatedVideo();
                            // }, 2000)

                        }, 2000)
                    }, 2000)

                    if (userAuth.email !== process.env.REACT_APP_DEMO_KEY) {
                        setLikeEmails(userAuth.email);
                    }

                } else {
                    history.push("./welcome");
                }
            });
        }


        checkUserState();

    }, [history, match.params.vid])






    const setLikedVideos = () => {
        fire.firestore().collection(likeEmails).doc(statisticslist[0].snippet.publishedAt).set({
            title: statisticslist[0].snippet.localized.title,
            thumbnails: statisticslist[0].snippet.thumbnails.high.url,
            publishAt: statisticslist[0].snippet.publishedAt,
            videoId: match.params.vid
        }).then((success) => {
            console.log("Liked");
        }).catch((error) => {
            console.log("Error : " + error);
        })
    }




    const getTextFromInput = (event) => {
        setSearch(event.target.value);
    }

    const getEventTriggered = (e) => {
        if (e.keyCode === 13) {
            if (search != null) {
                history.push("/search/" + search);
            }
        }
    }



    const getLike = {
        color: color
    }

    //create function for setformat 

    const getFormatDate = (d) => {
        const date = d.substring(8, 10);
        let month = d.substring(5, 7);
        const year = d.substring(0, 4);

        switch (month) {

            case "01":
                month = "Jan.";
                break;

            case "02":
                month = "Feb.";
                break;

            case "03":
                month = "Mar.";
                break;

            case "04":
                month = "Apr.";
                break;

            case "05":
                month = "May";
                break;
            case "06":
                month = "june";
                break;
            case "07":
                month = "July";
                break;
            case "08":
                month = "Aug.";
                break;
            case "09":
                month = "Sept.";
                break;
            case "10":
                month = "Oct.";
                break;
            case "11":
                month = "Nov.";
                break;
            case "12":
                month = "Dec.";
                break;

            default:
                console.log("Here Some Error In Date & TIme");
        }

        const hour = d.substring(11, 13);
        const minutes = d.substring(15, 16);

        return `${date}-${month}-${year} At ${hour}H : ${minutes}M `;
    }

    return (
        <div style={{ width: "100%" }}>
            <div className="header_Player">
                <div className="root_header">
                    <div className="image_header">
                        <div>
                            <YouTubeIcon style={{ color: "red", width: "4vh", height: "4vh", marginTop: "1vh" }} className="logo" onClick={() => { history.push("./") }} />
                            <p onClick={() => { history.push("./") }}>YouTube</p>
                        </div>

                    </div>

                    <div className="body_header">
                        <div className="div_search_bar">
                            <input className="search_area" placeholder="Search Video" onChange={getTextFromInput} onKeyDown={(e) => { getEventTriggered(e) }}>
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
                        <ExitToAppIcon style={{ color: "red", width: "4vh", height: "4vh", marginRight: "2vh", display: "none" }} onClick={() => { /* nothing to do */ }} />
                    </div>

                </div>
            </div>

            <div className="body_Player">
                <div style={{ width: "100%" }}>
                    <div className="left_child_PLayer">
                        <div className="YoutubePlayer_PLayer">
                            <div className="youtube_player_alingment">
                                <YouTubePlayer className="youtube_player_animation" width="100%" height="100%" url={`https://www.youtube.com/watch?v=${match.params.vid}`} controls={true} />
                            </div>
                        </div>

                        <div className="details_Section">
                            <div className="channel_details">
                                {!statisticslist ? null : <div>
                                    <img className="channle_logo_details_section" src={statisticslist[0].snippet.thumbnails.high.url} alt="Channel Logo"></img>
                                    <p>{statisticslist[0].snippet.channelTitle}</p>
                                </div>}
                            </div>

                            <div className="titleSection">
                                {!statisticslist ? null : <div>
                                    <p className="title_video">{statisticslist[0].snippet.localized.title}</p>
                                    {(!showDescription) ? <p style={{ color: "blue", fontWeight: "bold" }} onClick={() => { setShowDesription(!showDescription) }}>Show Description</p> : <p className="description_video"> {statisticslist[0].snippet.localized.description} <br></br><p onClick={() => { setShowDesription(!showDescription) }} style={{ color: "blue", fontWeight: "bold" }} >Hide Description </p><br></br></p>}
                                </div>}
                            </div>

                        </div>

                        {
                            //for statistics here
                            !statisticslist ? null :

                                <div style={{ width: "auto", height: "auto" }}>
                                    <hr style={{ width: "100%", height: "1px" }}></hr>

                                    <div className="statistics_section">

                                        <div className="partitions">
                                            <VisibilityIcon />
                                            <p>{statisticslist[0].statistics.viewCount}</p>
                                        </div>

                                        <div className="partitions">
                                            <ThumbUpAltIcon className="like" style={getLike} onClick={() => {
                                                setLikedVideos();
                                                setColor("red");
                                            }} />
                                            <p>{statisticslist[0].statistics.likeCount}</p>
                                        </div>

                                        <div className="partitions">
                                            <ThumbDownIcon />
                                            <p>{statisticslist[0].statistics.dislikeCount}</p>
                                        </div>
                                    </div>

                                    <hr style={{ width: "100%", height: "1px" }}></hr>
                                </div>


                        }




                        {!comment ? null : <div className="root_comment">

                            <div className="Comments">
                                <h2 style={{ width: "auto", height: "auto" }}>Comments</h2>
                                {(!showComments) ?
                                    <p onClick={() => { setShowComments(!showComments) }} style={{ width: "auto", height: "auto", marginLeft: "2vh", fontFamily: " 'Oswald', sans-serif", color: "blue", fontWeight: "bold" }}> Show Comments</p>

                                    :

                                    <div className="comments_section">

                                        {
                                            !comment ? null : comment.map((value, i) => {
                                                return (
                                                    <Comments key={i} imgUrl={value.snippet.topLevelComment.snippet.authorProfileImageUrl} userName={value.snippet.topLevelComment.snippet.authorDisplayName} comment={value.snippet.topLevelComment.snippet.textOriginal} updateAt={getFormatDate(value.snippet.topLevelComment.snippet.updatedAt)} />
                                                )
                                            })
                                        }

                                    </div>}

                                {(showComments) ? <p onClick={() => { setShowComments(!showComments) }} style={{ width: "auto", height: "auto", marginLeft: "2vh", fontFamily: " 'Oswald', sans-serif", color: "blue", fontWeight: "bold" }} >Hide Comments</p> : null}
                            </div>
                        </div>}



                        {!data ? null : <div>
                            <h2 className="relatedVideo_text">Related Videos</h2>
                            <div className="root_related_video">
                                <div className="right_child_PLayer">
                                    {
                                        !data ? null : data.map((value, i) => {
                                            return (<ListDetail key={i} imgUrl={value.snippet.thumbnails.high.url} title={value.snippet.title} publish={value.snippet.publishedAt} statistics={value.snippet.channelTitle} videoId={value.id.videoId} />)
                                        })
                                    }

                                    <p style={{ width: "100%", height: "auto", fontSize: "2vh", color: "black", textAlign: "center", fontFamily: "'Oswald', sans-serif" }}>Design And Devlop By Surya Kant Sharma</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerUI;