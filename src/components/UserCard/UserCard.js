import React from "react";
import styles from "./UserCard.module.css"
import {baseURL} from "../../axios/api";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


const UserCard = props => {
    const {id, first_name, last_name} = props.user.user;
    const avatarURL = props.user.avatar ? baseURL + props.user.avatar : "/images/no_avatar.png";

    const writeMsgHandler = () => {
        props.history.push('/im')
    };

    const addFriendHandler = () => {

    };

    const unfriendHandler = () => {

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
        buttons = <button className={`${styles.btn} ${styles.add_to_friends}`} onClick={addFriendHandler}>Add friend</button>
    }

    return (
        <div className={styles.UserCard}>
            <img className={styles.avatar} src={avatarURL}/>
            <div className={styles.block_info}>
                <p className={styles.name}>{first_name} {last_name}</p>
                <div className={styles.btn_block}>{buttons}</div>
            </div>
        </div>
    )
};

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default withRouter(connect(null, mapDispatchToProps)(UserCard));
