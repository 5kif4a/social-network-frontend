import React from "react";
import styles from "./Post.module.css";
import {connect} from "react-redux";
import {baseURL} from "../../axios/api";

const Post = props => {
    const avatarURL = props.avatar ? baseURL + props.avatar : "/images/person";
    const created_at = new Date(props.created_at).toLocaleString();

    return (
        <div className={styles.Post}>
            <div className={styles.Post__User}>
                <img className={styles.Post__Avatar}
                     src={avatarURL}
                     alt="avatar"/>
                <p className={styles.Post__Username}>{props.username}</p>
                <span className={styles.Post__Datetime}>{created_at}</span>
            </div>
            <div className={styles.Post__Content}>
                {props.attachment ?
                    <img className={styles.Post__Image}
                         src={baseURL + props.attachment}
                         alt="post"/> : null}
                {props.content}
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        username: state.user.username,
        avatar: state.user.avatar
    }
}

export default connect(mapStateToProps)(Post)
