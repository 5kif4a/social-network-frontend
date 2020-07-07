import React from "react";
import styles from "./SearchField.module.css"

export default () => {
    return (
        <div className={styles.SearchField}>
            <input
                placeholder="Search users"
            />
        </div>
    )
}
