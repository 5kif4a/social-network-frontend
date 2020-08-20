import React from "react";
import styles from "./ChatPage.module.css"
import {connect} from "react-redux";


// TODO Chat Page
const Chat = props => {
    const interlocutor_message = `${styles.Message} ${styles.interlocutor}`;
    const user_message = `${styles.Message} ${styles.user}`;

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
                    <div className={interlocutor_message}>
                        <img/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className={user_message}>
                        <img/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
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
