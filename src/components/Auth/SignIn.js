import React, {useEffect, useRef, useState} from "react";
import styles from "./Auth.module.css"
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {LogIn} from "../../store/actions/auth";

const SignIn = props => {
    const firstRender = useRef(true);

    // Username Controls - not using nested object due to incomprehensible behavior
    const [username, setUsername] = useState("");
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

    // Password controls
    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [alertStyle, setAlertStyle] = useState(styles.alert);

    const alertDismissHandler = () => {
        setAlertStyle(styles.dismiss);
    };

    const loginHandler = e => {
        e.preventDefault();
        if (usernameIsValid && passwordIsValid) {
            setAlertStyle(styles.alert);
            props.Login(username, password);
        }
    };

    // validation here
    useEffect(() => {
        // skip validation on first render
        if (firstRender.current) {
            firstRender.current = false;
            return
        }

        // username field validation
        if (!username.length) {
            setUsernameIsValid(false);
            setUsernameErrorMessage("Username field cannot be empty!")
        } else {
            setUsernameIsValid(true);
            setUsernameErrorMessage("");
        }
        // password field validation
        if (!password.length) {
            setPasswordIsValid(false);
            setPasswordErrorMessage("Password field cannot be empty!")
        } else {
            setPasswordIsValid(true);
            setPasswordErrorMessage("");
        }

    }, [username, password]);

    return (
        <div className={styles.Auth}>
            <form className={styles.SignIn__form}>
                <h3 className={styles.heading}>Sign In</h3>
                {/* alert with back-end errors */}
                {
                    props.error ? <div className={alertStyle}>
                        {props.error_message}
                        <a onClick={alertDismissHandler}>&times;</a>
                    </div> : null
                }
                {/* username input start */}
                <label htmlFor="username" className={styles.label}>Username</label>
                <input
                    id="username"
                    type="text"
                    value={username.trim()}
                    className={!usernameIsValid && !firstRender.current ?
                        styles.input__invalid : styles.input}
                    onChange={e => setUsername(e.target.value.trim())}
                />
                {!usernameIsValid ?
                    <span className={styles.err_msg}>{usernameErrorMessage}</span> : null}
                {/* username input end */}

                {/* password input start */}
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    id="password"
                    type="password"
                    value={password.trim()}
                    className={!passwordIsValid && !firstRender.current ?
                        styles.input__invalid : styles.input}
                    onChange={e => setPassword(e.target.value.trim())}
                />
                {!passwordIsValid ?
                    <span className={styles.err_msg}>{passwordErrorMessage}</span> : null}
                {/* password input end */}

                <button
                    onClick={loginHandler}
                    className={!props.isRequesting ? styles.btn : styles.btn__disabled}
                    disabled={props.isRequesting}
                >
                    {props.isRequesting ? "Wait" : "Login"}
                </button>
                <p className={styles.text}>Does not have account? <Link to={"/register"}>Sign up</Link></p>
            </form>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        isRequesting: state.auth.isRequesting,
        isAuthenticated: !!state.auth.access_token,
        error: state.auth.error,
        error_message: state.auth.error_message,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Login: (username, password) => dispatch(LogIn(username, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
