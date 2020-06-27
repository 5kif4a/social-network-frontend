import React from "react";
import styles from "./Post.module.css";

export default props => {
    return (
        <div className={styles.Post}>
            <div className={styles.Post__User}>
                <img className={styles.Post__Avatar}
                     src="/images/person.png"
                     alt="avatar"/>
                <p className={styles.Post__Username}>User Name</p>
            </div>
            <div className={styles.Post__Content}>
                {props.image ?
                    <img className={styles.Post__Image}
                         src={props.image}
                         alt="post"/> : null}
                {props.content}
            </div>
        </div>
    )
}
