import React from "react";
import styles from "./Auth.module.css"
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const SignUp = props => {

    return (
        <div className={styles.Auth}>
            <form className={styles.SignUp__form}>
                <h3 className={styles.heading}>Create account</h3>
                <input
                    className={styles.input}
                    placeholder="Username"
                    required/>
                <input
                    className={styles.input}
                    placeholder="First Name"
                    required/>
                <input
                    className={styles.input}
                    placeholder="Last Name"
                    required/>
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
                <input
                    type="password"
                    className={styles.input}
                    placeholder="Confirm password"
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


export default connect()(SignUp);
