import React from "react";
import styles from "./UsersList.module.css";
import UserCard from "../UserCard/UserCard";

export default props => {
    let users;

    if (props.users.length) {
        users = (
            props.friends.map((friend, index) => {
                return <UserCard key={index} user={friend}/>
            })
        )
    } else {
        users = (
            <p>No matches</p>
        )
    }

    return (
        <div className={styles.UsersList}>
            <hr/>
            <h3 className={styles.heading}>Other users</h3>
            {users}
        </div>
    )
}
