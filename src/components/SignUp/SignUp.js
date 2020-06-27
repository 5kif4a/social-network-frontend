import React from "react";
import styles from "./SignUp.module.css"
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const SignUp = props => {
    return (
        <div className={styles.SignIn}>
            <form className={styles.SignIn__form}>
                <h3 className={styles.SignIn__heading}>Sign In</h3>
                <input
                    type="email"
                    className={styles.SignIn__input}
                    placeholder="Email"
                    required/>
                <input
                    type="password"
                    className={styles.SignIn__input}
                    placeholder="Password"
                    required/>
                <button
                    // onClick={}
                    className={styles.SignIn__btn}
                >Login
                </button>
            </form>
        </div>
    )
};

export default connect()(SignUp);
