import React from "react";
import styles from "./Posts.module.css"
import Post from "../Post/Post";
import {connect} from "react-redux";
import {fetchPosts} from "../../store/actions/posts";

const Posts = props => {
    return (
        <div className={styles.Posts}>
            {
                props.posts.map((post, index) => {
                    return <Post key={index}
                                 image={post.image}
                                 content={post.content}
                    />
                })
            }
        </div>
    )
};

function mapStateToProps(state) {
    return {
        posts: state.posts.posts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)

