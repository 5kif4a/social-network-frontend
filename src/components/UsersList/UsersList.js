import React from "react";
import styles from "./UsersList.module.css";
import UserCard from "../UserCard/UserCard";

export default props => {
    let users;

    if (props.users.length) {
        users = (
            props.users.map((user, index) => {
                return <UserCard key={index} user={user}/>
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
