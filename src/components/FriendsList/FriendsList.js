import React from "react";
import styles from "./FriendsList.module.css";
import UserCard from "../UserCard/UserCard";

export default props => {
    let friends;

    if (props.friends) {
        friends = (
            props.friends.map(friend => {
                return <UserCard friend={friend}/>
            })
        )
    } else {
        friends = (
            <p>No friends were found</p>
        )
    }

    return (
        <ul className={styles.FriendsList}>
            {friends}
        </ul>
    )
}
