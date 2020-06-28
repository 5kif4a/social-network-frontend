import React from "react";
import styles from "./Auth.module.css"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {LogIn} from "../../store/actions/user";


const SignIn = props => {
    return (
        <div className={styles.Auth}>
            <form className={styles.SignIn__form}>
                <h3 className={styles.heading}>Sign In</h3>
                <input
                    type="email"
                    className={styles.input}
                    placeholder="Email"
                    required/>
                <input
                    type="password"
                    className={styles.input}
                    placeholder="Password"
                    required/>
                <button
                    onClick={props.Login}
                    className={styles.btn}
                >Login
                </button>
                <p className={styles.text}>Does not have account? <Link to={"/register"}>Sign up</Link></p>
            </form>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        error: state.user.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Login: () => dispatch(LogIn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
