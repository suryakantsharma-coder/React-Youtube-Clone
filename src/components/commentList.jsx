import React from 'react';
import "./css/comment.css"

const CommenttUI = (props) => {

    return (
        <div className="root_Comment">
            <div className="user_profile_Comment">
                <img className="user_profile" src={props.imgUrl} alt="Sorry It's Not Loded Please Refresh"></img>
                <p>{props.userName}</p>
            </div>

            <div className="user_data_Comment">
                <p>{props.comment}<code>{"\n" + props.updateAt}</code>  </p>
            </div>
        </div>
    )
}

export default CommenttUI;