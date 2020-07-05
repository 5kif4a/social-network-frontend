import React from "react";
import './spinner.css';

export default () =>
    <div className="spinner">
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
