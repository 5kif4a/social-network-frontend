import React from "react";
import styles from "./Auth.module.css"
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const SignUp = props => {

    return (
        <div className={styles.Auth}>
            <form className={styles.SignUp__form}>
                <h3 className={styles.heading}>Create account</h3>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input
                    id="username"
                    className={styles.input}
                    required/>
                <label htmlFor="first_name" className={styles.label}>First Name</label>
                <input
                    id="first_name"
                    className={styles.input}
                    required/>
                <label htmlFor="last_name" className={styles.label}>Last Name</label>
                <input
                    id="last_name"
                    className={styles.input}
                    required/>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    id="email"
                    type="email"
                    className={styles.input}
                    required/>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    id="password"
                    type="password"
                    className={styles.input}
                    required/>
                <label htmlFor="confirm_password" className={styles.label}>Confirm Password</label>
                <input
                    id="confirm_password"
                    type="password"
                    className={styles.input}
                    required/>
                <button
                    // onClick={}
                    className={styles.btn}
                >Sign Up
                </button>
                <p className={styles.text}>Already registered? <Link to={"/auth"}>Sign In</Link></p>
            </form>
        </div>
    )
};

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
