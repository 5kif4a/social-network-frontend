import React from "react";
import styles from "./ChatPage.module.css"
import {connect} from "react-redux";


// TODO Chat Page
const Chat = props => {
    return (
        <div className={styles.Chat}>
            <ul className={styles.ChatList}>
                <li className={styles.ChatListItem}>
                    <img/>
                    <p>User Name</p>
                    <div className={`${styles.status}  ${styles.online}`}/>
                </li>
                <li className={`${styles.ChatListItem} ${styles.current}`}>
                    <img/>
                    <p>User Name</p>
                    <div className={`${styles.status}  ${styles.online}`}/>
                </li>
                <li className={styles.ChatListItem}>
                    <img/>
                    <p>User Name</p>
                    <div className={`${styles.status}  ${styles.online}`}/>
                </li>
            </ul>

            <div className={styles.Main}>
                <div className={styles.Messages}>

                </div>

                <div className={styles.Input}>
                    <textarea/>
                    <button>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
