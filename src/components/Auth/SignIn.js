import React, {useState} from "react";
import styles from "./Auth.module.css"
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {LogIn} from "../../store/actions/auth";


const SignIn = props => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertStyle, setAlertStyle] = useState(styles.alert);

    const dismissHandler = () => {
        setAlertStyle(styles.dismiss);
    };

    const loginHandler = e => {
        e.preventDefault();
        setAlertStyle(styles.alert);
        props.Login(username, password)
            .then(() => {
            if (props.isAuthenticated)
                history.push("/profile");
        });
    };

    return (
        <div className={styles.Auth}>
            <form className={styles.SignIn__form}>
                <h3 className={styles.heading}>Sign In</h3>
                {/* alert when error */}
                {
                    props.error ? <div className={alertStyle}>
                        Invalid username or password!
                        <a onClick={dismissHandler}>&times;</a>
                    </div> : null
                }
                <input
                    type="text"
                    className={styles.input}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    className={styles.input}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
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
        error: state.auth.error,
        isRequesting: state.auth.isRequesting,
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Login: (username, password) => dispatch(LogIn(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
