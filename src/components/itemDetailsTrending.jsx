import React from 'react';
import "./css/listDesign.css";
import { useHistory } from 'react-router-dom';
import fire from './firebaseInit';

function UI(props) {

    const history = useHistory();

    const DateFormate = () => {
        let date = props.publish.substring(0, 10);
        let month = props.publish.substring(5, 7);

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
                console.log("Date & Time Is not right");
        }

        return `${date} - ${month}`;

    }

    const setHistory = (title, img, publishAt, videoId) => {

        fire.firestore().collection("Youtube_Web_App").doc(publishAt).set({
            title,
            img,
            publishAt,
            videoId
        }).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });


    }

    const setClickListener = () => {

        if (props.statistics !== "Channel") {
            history.push("/p/" + (props.videoId));
            setHistory(props.title, props.imgUrl, props.publish, props.videoId);
        } else {
            console.log("It's Channel Sorry But it's Available Now")
        }

    }


    return (

        <div className="card" onClick={setClickListener}>

            {(props.statistics === "Channel") ? <img src={props.imgUrl} style={{ borderRadius: "50%", boxShadow: " 2px 2px 4px 0px solid black" }} className="card-img-top" alt="..."></img> : <img src={props.imgUrl} className="card-img-top" alt="..."></img>}
            <div className="card_show_details_section">
                <div className="channel_Img">
                    <img className="channel_logo" src={props.imgUrl} alt="Please Referesh Page" />
                </div>
                <div className="title_section">
                    <p className="card-text">{`${(props.title.length > 20) ? props.title.substring(0, 30) + "..." : null} - ${DateFormate()} - ${(props.statistics > 1000000) ? (parseInt(props.statistics) / 1000000).toFixed(2) + "M" : (parseInt(props.statistics) / 1000000).toFixed(3) + "K"} `}</p>
                </div>

            </div>
        </div>
    )
}

export default UI;