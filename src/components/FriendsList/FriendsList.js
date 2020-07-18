import React from "react";
import styles from "./FriendsList.module.css";
import UserCard from "../UserCard/UserCard";

export default props => {
    let friends;

    if (props.friends.length) {
        friends = (
            props.friends.map((friend, index) => {
                return <UserCard key={index} user={friend} isFriend/>
            })
        )
    } else {
        friends = (
            <h3 className={styles.text}>No friends were found</h3>
        )
    }

    return (
        <div className={styles.FriendsList}>
            {friends}
        </div>
    )
}
