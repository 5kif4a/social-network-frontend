import React from "react";
import styles from "./Auth.module.css";

export default props => {
    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                className={!props.isValid && !props.firstRender.current ?
                    styles.input__invalid : styles.input}
                onChange={props.onChange}
                required
            />
            {!props.isValid ?
                <span className={styles.err_msg}>{props.errorMessage}</span> : null}
        </>
    )
}
