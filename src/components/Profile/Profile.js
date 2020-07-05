import React, {useEffect, useState} from "react";
import styles from "./Profile.module.css";
import Posts from "../Posts/Posts";
import {connect} from "react-redux";
import GetUserProfileInfo, {PublishPost} from "../../store/actions/user";
import {FetchPosts} from "../../store/actions/posts";

const Profile = props => {
    const [postContent, setPostContent] = useState("");
    const [postPublished, setPostPublished] = useState(0);

    const publishHandler = () => {
        if (postContent.length) {
            props.publishPost(props.user_id, postContent);
            setPostContent("");  // clear textarea

            setPostPublished(postPublished + 1);  // dependency for useEffect Hook
        }
    };

    useEffect(() => {
        props.getUserProfileInfo(props.user_id);
        props.fetchPosts(props.user_id);
    }, [postPublished]);


    return (
        <div className={styles.Profile}>
            <div className={styles.Theme}>
                <img className={styles.BackgroundPhoto}
                     src="https://images.wallpaperscraft.ru/image/tatry_polsha_gory_114428_1024x768.jpg"
                     alt="profile background"/>
                <img className={styles.Avatar} src="/images/person.png" alt="avatar"/>
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
                            <button className={styles.Publish__attachment_button}>
                                <img src="/images/attach.png" alt="attach"/>
                                Add image
                            </button>
                            <button
                                className={styles.Publish__publish_button}
                                onClick={publishHandler}
                            >Publish
                            </button>
                        </div>
                    </div>
                    <div className={styles.Status}>
                        <img className={styles.Avatar__small} src="/images/person.png" alt="avatar"/>
                        <div className={styles.Status__content}>
                            <p className={styles.UserName__small}>
                                {props.username || "Loading..."}
                            </p>
                            {props.status || "Set a status message"}
                        </div>
                    </div>
                </div>
                <hr className={styles.Divider}/>
                <Posts/>
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
        status: state.user.status
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserProfileInfo: user_id => dispatch(GetUserProfileInfo(user_id)),
        publishPost: (user_id, content) => dispatch(PublishPost(user_id, content)),
        fetchPosts: (user_id) => dispatch(FetchPosts(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
