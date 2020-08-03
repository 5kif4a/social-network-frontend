import React from "react";
import styles from "./UserCard.module.css"
import {mediaURL} from "../../axios/api";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {addFriend, unfriend} from "../../store/actions/friends";


const UserCard = props => {
    const {id, username, first_name, last_name} = props.user.user;
    const avatarURL = props.user.avatar ? mediaURL + props.user.avatar : "/images/no_avatar.png";

    const writeMsgHandler = () => {
        props.history.push('/im', {user_id: id})
    };

    const addFriendHandler = () => {
        props.addFriend(id);
    };

    const unfriendHandler = () => {
        props.unfriend(id);
    };

    let buttons;
    if (props.isFriend) {
        buttons = (
            <>
                <button className={`${styles.btn} ${styles.write_msg}`} onClick={writeMsgHandler}>Write message</button>
                <button className={`${styles.btn} ${styles.unfriend}`} onClick={unfriendHandler}>Unfriend</button>
            </>
        )
    } else {
        buttons =
            <button className={`${styles.btn} ${styles.add_to_friends}`} onClick={addFriendHandler}>Add friend</button>
    }

    return (
        <div className={styles.UserCard}>
            <Link to={`profile/${username}`}>
                <img className={styles.avatar} src={avatarURL}/>
            </Link>
            <div className={styles.block_info}>
                <Link className={styles.link} to={`profile/${username}`}>
                    <p className={styles.name}>{first_name} {last_name}</p>
                </Link>
                <div className={styles.btn_block}>{buttons}</div>
            </div>
        </div>
    )
};

function mapDispatchToProps(dispatch) {
    return {
        addFriend: user_id => dispatch(addFriend(user_id)),
        unfriend: user_id => dispatch(unfriend(user_id))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(UserCard));
