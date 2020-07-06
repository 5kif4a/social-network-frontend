import React, {useEffect, useRef, useState} from "react";
import styles from "./Auth.module.css"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {LogIn} from "../../store/actions/auth";
import Input from "./Input";

const SignIn = props => {
    const firstRender = useRef(true);

    // Not using nested object due to incomprehensible behavior
    // Username Controls
    const [username, setUsername] = useState("");
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

    // Password controls
    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [alertStyle, setAlertStyle] = useState(styles.alert);

    const validationHandler = () => {
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
    };

    const alertDismissHandler = () => {
        setAlertStyle(styles.dismiss);
    };

    const loginHandler = e => {
        e.preventDefault();

        validationHandler();
        if (usernameIsValid && passwordIsValid) {
            setAlertStyle(styles.alert);
            props.Login(username, password);
        }
    };

    useEffect(() => {
        // skip validation on first render
        if (firstRender.current) {
            firstRender.current = false;
            return
        }
        validationHandler();
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
                <Input
                    id="username"
                    label="Username"
                    type="text"
                    isValid={usernameIsValid}
                    firstRender={firstRender}
                    onChange={e => setUsername(e.target.value)}
                    errorMessage={usernameErrorMessage}
                />
                {/* username input end */}

                {/* password input start */}
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    firstRender={firstRender}
                    onChange={e => setPassword(e.target.value)}
                    errorMessage={passwordErrorMessage}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
