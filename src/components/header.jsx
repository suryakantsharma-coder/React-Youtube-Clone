import React, { useState } from 'react';
import "./css/header.css";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PeopleIcon from '@material-ui/icons/People';


//<li className="nav-item">
//     <a class="nav-link active" aria-current="page" href="#">Active</a>
// </li>
// <li className="nav-item">
//     <a className="nav-link" href="#">Link</a>
// </li>
// <li className="nav-item">
//     <a className="nav-link" href="#">Link</a>
// </li>
// <li className="nav-item">
//     <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
// </li>

function Header({ setClick, show, setSearch }) {


    let [text, setText] = useState('');

    const getText = (event) => {
        text = event.target.value;
        setText(text);
    }

    const SearchVideo = async () => {
        const url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyAITZEmMxYuv5tfvudOoKozWEXnW2zGYv4"
        const response = await fetch(url);
        const result = await response.json();
        console.log("Data : " + result)
        setSearch(result.items);
    }


    return (
        <div className="root_header">
            <div className="image_header">
                <div>
                    <MenuIcon onClick={() => {
                        setClick(!show);
                    }} style={{ width: "4vh", height: "4vh", marginTop: "1vh", marginLeft: "1vh" }} />
                    <YouTubeIcon style={{ color: "red", width: "4vh", height: "4vh", marginTop: "1vh" }} className="logo" />
                    <p>YouTube</p>
                </div>

            </div>

            <div className="body_header">
                <div className="div_search_bar">
                    <input className="search_area" placeholder="Search Video" onChange={getText}>
                    </input>
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
                <PeopleIcon style={{ color: "red", borderRadius: "50%", boxShadow: "0.5px 0px 1px 0px black", width: "4vh", height: "4vh", marginRight: "2vh" }} />
            </div>

        </div>


    )
}

export default Header;