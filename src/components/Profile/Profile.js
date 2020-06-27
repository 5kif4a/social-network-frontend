import React from "react";
import styles from "./Profile.module.css";
import Posts from "../Posts/Posts";

export default props => {
    return (
        <div className={styles.Profile}>
            <div className={styles.Theme}>
                <img className={styles.BackgroundPhoto}
                     src="https://images.wallpaperscraft.ru/image/tatry_polsha_gory_114428_1024x768.jpg"
                     alt="profile background"/>
                <img className={styles.Avatar} src="/images/person.png" alt="avatar"/>
                <p className={styles.UserName}>User Name</p>
            </div>
            <div className={styles.Content}>
                <div className={styles.Publish}>
                    <div className={styles.Publish__form}>
                        <textarea className={styles.Publish__textarea}/>
                        <button className={styles.Publish__button}>Publish</button>
                    </div>
                    <div className={styles.Status}>
                        <img className={styles.Avatar__small} src="/images/person.png" alt="avatar"/>
                        <div className={styles.Status__content}>
                            <p className={styles.UserName__small}>User Name</p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Proin ornare congue diam et consectetur. Nunc laoreet sapien sed euismod iaculis.
                        </div>
                    </div>
                </div>
                <hr className={styles.Divider}/>
                <Posts posts={props.posts}/>
            </div>
        </div>
    )
}
