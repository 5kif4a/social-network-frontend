import React, {useEffect} from "react";
import styles from "./Posts.module.css"
import Post from "../Post/Post";
import {connect} from "react-redux";
import {FetchPosts} from "../../store/actions/posts";
import Spinner from "../Spinner/Spinner";

const Posts = props => {
    let posts;

    if (props.posts.length > 0) {
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
            <p className={styles.Posts__no_posts_message}>No posts yet</p>
        )
    }

    useEffect(() => {
        props.fetchPosts(props.user_id)
    }, []);

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
        user_id: state.auth.user_id,
        posts: state.posts.posts,
        isLoaded: state.posts.isLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: user_id => dispatch(FetchPosts(user_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)

