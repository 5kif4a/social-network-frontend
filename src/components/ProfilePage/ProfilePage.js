import React, {useEffect, useState} from "react";
import styles from "./ProfilePage.module.css";
import Posts from "../Posts/Posts";
import {connect} from "react-redux";
import GetUserProfileInfo from "../../store/actions/user";
import {FetchPosts, PublishPost} from "../../store/actions/posts";
import {baseURL} from "../../axios/api";
import {withRouter} from "react-router-dom";

const ProfilePage = props => {
    const [postContent, setPostContent] = useState("");
    const [image, setImage] = useState(null);

    const avatarURL = props.avatar ? baseURL + props.avatar : "/images/no_avatar.png";
    const themeURL = props.theme ? baseURL + props.theme : "/images/not_theme.png";

    const publishHandler = () => {
        if (postContent.length) {
            props.publishPost(props.user_id, postContent, image);
            setPostContent("");  // clear textarea
            setImage(null);
        }
    };

    useEffect(() => {
        props.getUserProfileInfo(props.user_id);
        props.fetchPosts(props.user_id);
    }, []);

    useEffect(() => {
        props.fetchPosts(props.user_id);
    }, [props.isPublishing]); // TODO need to find another dependency


    return (
        <div className={styles.Profile}>
            <div className={styles.Theme}>
                <img className={styles.BackgroundPhoto}
                     src={themeURL}
                     alt="profile background"/>
                <img className={styles.Avatar} src={avatarURL} alt="avatar"/>
                <p className={styles.UserName}>{props.username || "Loading..."}</p>
                <p className={styles.UserName}>{props.first_name} {props.last_name}</p>
            </div>
            <div className={styles.Content}>
                <div className={styles.Publish}>
                    <div className={styles.Publish__form}>
                        <textarea className={styles.Publish__textarea}
                                  value={postContent}
                                  placeholder="Write a post..."
                                  onChange={e => setPostContent(e.target.value)}
                        />
                        <div className={styles.Publish__buttons}>
                            <label className={styles.Publish__attachment}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImage(e.target.files[0])}
                                />
                                <img src="/images/attach.png" alt="attach"/>
                                Add image
                            </label>
                            <button
                                className={styles.Publish__publish_button}
                                onClick={publishHandler}
                            >
                                {props.isPublishing ? "Publishing..." : "Publish"}
                            </button>
                        </div>
                        {/* show image filename if attached */}
                        {image ?
                            <span className={styles.Filename}>{image.name}
                                <button
                                    className={styles.RemoveFile}
                                    onClick={() => setImage(null)}
                                >&times;
                            </button>
                            </span>
                            : null}
                    </div>
                    <div className={styles.Status}>
                        <img className={styles.Avatar__small} src={avatarURL} alt="avatar"/>
                        <div className={styles.Status__content}>
                            <p className={styles.UserName__small}>
                                {props.username || "Loading..."}
                            </p>
                            {props.status || "Set a status message"}
                        </div>
                    </div>
                </div>
                <hr className={styles.Divider}/>
                <Posts posts={props.posts}/>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        user_id: state.auth.user_id,

        username: state.user.username,
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        avatar: state.user.avatar,
        theme: state.user.theme,
        status: state.user.status,

        posts: state.posts.posts,
        isPublishing: state.posts.isPublishing
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserProfileInfo: user_id => dispatch(GetUserProfileInfo(user_id)),
        publishPost: (user_id, content, image) => dispatch(PublishPost(user_id, content, image)),
        fetchPosts: (user_id) => dispatch(FetchPosts(user_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))
