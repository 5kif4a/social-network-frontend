import React from "react";
import styles from "./Success.module.css";
import {withRouter} from "react-router-dom";

const Success = props => {
    const buttonHandler = () => {
        props.history.push("/auth")
    };

    return (
        <div className={styles.Success}>
            <div className={styles.block}>
                <h3 className={styles.heading}>Registration successful</h3>
                <p className={styles.text}>You have successfully registered
                    Now you can log in</p>
                <button
                    className={styles.btn}
                    onClick={buttonHandler}
                >
                    Go to the login
                </button>
            </div>
        </div>
    )
};

export default withRouter(Success);
