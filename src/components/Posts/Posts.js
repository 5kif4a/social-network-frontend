import React from "react";
import styles from "./Posts.module.css"
import Post from "../Post/Post";
import {connect} from "react-redux";
import Spinner from "../Spinner/Spinner";

const Posts = props => {
    let posts;

    if (props.posts.length) {
        posts = (
            props.posts.map((post, index) => {
                return <Post key={index}
                             created_at={post.created_at}
                             content={post.content}
                             attachment={post.attachment}
                />
            })
        )
    } else {
        posts = (
            <p className={styles.Posts__no_posts_message}>No posts</p>
        )
    }

    return (
        <div className={styles.Posts}>
            {
                props.isLoaded ? posts : <Spinner/>
            }
        </div>
    )
};

function mapStateToProps(state) {
    return {
        isLoaded: state.posts.isLoaded
    }
}


export default connect(mapStateToProps)(Posts)

