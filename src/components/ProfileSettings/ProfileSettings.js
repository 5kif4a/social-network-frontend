import React, {useEffect, useState} from "react";
import styles from "./ProfileSettings.module.css"
import {connect} from "react-redux";
import {baseURL} from "../../axios/api";
import GetUserProfileInfo from "../../store/actions/user";

const ProfileSettings = props => {
    const avatarURL = props.avatar ? baseURL + props.avatar : "/images/no_avatar.png";

    const [avatarImage, setAvatarImage] = useState();
    const [backgroundThemeImage, setBackgroundThemeImage] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [status, setStatus] = useState("");

    const saveHandler = e => {
        e.preventDefault()
    };

    useEffect(() => {
        props.getUserProfileInfo(props.user_id)
    }, []);

    return (
        <div className={styles.ProfileSettings}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Profile Settings</h1>
                <label className={styles.avatar_block}>
                    <input
                        type="file"
                        accept="image/*"
                    />
                    <img className={styles.avatar} src={avatarURL} alt="avatar"/>
                    <span>Choose Avatar</span>
                </label>
                <label className={styles.label}>Background Theme</label>
                <input
                    type="file"
                    accept="image/*"
                />
                <div className={styles.others}>
                    <div className={styles.names}>
                        <div>
                            <label className={styles.label}>First Name</label>
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Last Name</label>
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.status}>
                        <label className={styles.label}>Status</label>
                        <textarea
                            maxLength="140"
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className={styles.btn}
                    onClick={(e) => saveHandler(e)}
                >
                    Save
                </button>
                {
                    //    alert here
                }
            </form>

        </div>
    )
};

function mapStateToProps(state) {
    return {
        user_id: state.auth.user_id,
        first_name: state.user.first_name,
        last_name: state.user.last_name,
        avatar: state.user.avatar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserProfileInfo: user_id => dispatch(GetUserProfileInfo(user_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
