import React from "react";
import styles from "./SignIn.module.css"
import {connect} from "react-redux";
import {Link} from "react-router-dom";


const SignIn = props => {
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
                <p>Does not have account? <Link to={"/register"}>Sign up now</Link></p>
            </form>
        </div>
    )
};

export default connect()(SignIn);
