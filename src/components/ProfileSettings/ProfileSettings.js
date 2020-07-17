import React, {useEffect, useState} from "react";
import styles from "./ProfileSettings.module.css"
import {connect} from "react-redux";
import {baseURL} from "../../axios/api";
import GetUserProfileInfo, {SaveChangesUserProfileInfo} from "../../store/actions/user";

const ProfileSettings = props => {
    const avatarURL = props.avatar ? baseURL + props.avatar : "/images/no_avatar.png";

    const [avatarImage, setAvatarImage] = useState(null);
    const [backgroundThemeImage, setBackgroundThemeImage] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [status, setStatus] = useState("");

    const somethingChanged = [avatarImage, backgroundThemeImage, firstName, lastName, status].some(field => field);

    const initialAlertStyles = {
        success: `${styles.alert} ${styles.alert_success}`,
        fail: `${styles.alert} ${styles.alert_fail}`
    };

    const [alertStyles, setAlertStyles] = useState(initialAlertStyles);

    const clearInputs = () => {
        setAvatarImage(null);
        setBackgroundThemeImage(null);
        setFirstName("");
        setLastName("");
        setStatus("");
    };

    const alertDismissHandler = () => {
        setAlertStyles({success: styles.dismiss, fail: styles.dismiss});
    };

    const saveHandler = e => {
        e.preventDefault();
        if (somethingChanged) {
            const data = {
                avatar: avatarImage,
                theme: backgroundThemeImage,
                first_name: firstName,
                last_name: lastName,
                status
            };
            setAlertStyles(initialAlertStyles); // remove alerts
            props.saveChangesUserProfileInfo(data);
            clearInputs();
        }
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
                        onChange={e => setAvatarImage(e.target.files[0])}
                    />
                    <img className={styles.avatar} src={avatarURL} alt="avatar"/>
                    <span>{props.first_name} {props.last_name}</span>
                </label>
                <label className={styles.label}>Background Theme</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setBackgroundThemeImage(e.target.files[0])}
                />
                <div>
                    <div className={styles.names}>
                        <div>
                            <label className={styles.label}>First Name</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Last Name</label>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.status}>
                        <label className={styles.label}>Status</label>
                        <textarea
                            maxLength="140"
                            value={status}
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
                {/* alerts here */}
                {
                    props.success ? <div className={alertStyles.success}>
                        {props.alert_msg}
                        <a onClick={alertDismissHandler}>&times;</a>
                    </div> : null
                }
                {
                    props.error ? <div className={alertStyles.fail}>
                        {props.alert_msg}
                        <a onClick={alertDismissHandler}>&times;</a>
                    </div> : null
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
        avatar: state.user.avatar,
        success: state.user.profile_settings_update_success,
        error: state.user.profile_settings_error,
        alert_msg: state.user.profile_settings_alert_msg,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserProfileInfo: user_id => dispatch(GetUserProfileInfo(user_id)),
        saveChangesUserProfileInfo: (data) => dispatch(SaveChangesUserProfileInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
