import React, {useEffect, useRef, useState} from "react";
import styles from "./Auth.module.css"
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {Register} from "../../store/actions/auth";
import Input from "./Input";
import {email_regex, name_regex, password_regex, username_regex} from "../../service/regex";

const SignUp = props => {
    const firstRender = useRef(true);
    // Not using nested object due to incomprehensible behavior
    // Username Controls
    const [username, setUsername] = useState("");
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    // Email Controls
    const [email, setEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    // Name controls
    const [firstName, setFirstName] = useState("");
    const [firstNameIsValid, setFirstNameIsValid] = useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

    const [lastName, setLastName] = useState("");
    const [lastNameIsValid, setLastNameIsValid] = useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
    // Password controls
    const [password, setPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [confirmationPasswordIsValid, setConfirmationPasswordIsValid] = useState(false);
    const [confirmationPasswordErrorMessage, setConfirmationPasswordErrorMessage] = useState("");

    const [alertStyle, setAlertStyle] = useState(styles.alert);

    const allIsValid = [
        usernameIsValid,
        emailIsValid,
        firstNameIsValid,
        lastNameIsValid,
        passwordIsValid,
        confirmationPasswordIsValid].every(el => el);

    const validationHandler = () => {
        // all valid
        setUsernameIsValid(true);
        setUsernameErrorMessage("");

        setEmailIsValid(true);
        setEmailErrorMessage("");

        setFirstNameIsValid(true);
        setFirstNameErrorMessage("");

        setLastNameIsValid(true);
        setLastNameErrorMessage("");

        setPasswordIsValid(true);
        setPasswordErrorMessage("");

        setConfirmationPasswordIsValid(true);
        setConfirmationPasswordErrorMessage("");

        // username validation
        if (!username.match(username_regex)) {
            setUsernameIsValid(false);
            setUsernameErrorMessage("Username can only contain letters, numbers and /./-/_ characters, the minimum length is 3 characters, the maximum is 16.");
        }
        // email validation
        if (!email.length) {
            setEmailIsValid(false);
            setEmailErrorMessage("Email field cannot be empty!");
        }
        if (!email.match(email_regex)) {
            setEmailIsValid(false);
            setEmailErrorMessage("Invalid email!");
        }

        // name validation
        if (!firstName.length) {
            setFirstNameIsValid(false);
            setFirstNameErrorMessage("First name field cannot be empty!");
        }

        if (!lastName.length) {
            setLastNameIsValid(false);
            setLastNameErrorMessage("Last name field cannot be empty!");
        }

        if (firstName.match(name_regex)) {
            setFirstNameIsValid(false);
            setFirstNameErrorMessage("First name cannot contain specific characters and numbers.");
        }

        if (lastName.match(name_regex)) {
            setLastNameIsValid(false);
            setLastNameErrorMessage("Last name cannot contain specific characters and numbers.");
        }

        // password validation
        if (!password.match(password_regex)) {
            setPasswordIsValid(false);
            setPasswordErrorMessage("The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, at least one special character, at least eight characters")
        }

        if (!confirmationPassword.length) {
            setConfirmationPasswordIsValid(false);
            setConfirmationPasswordErrorMessage("Confirmation password field cannot be empty!");
        } else if (password !== confirmationPassword) {
            setConfirmationPasswordIsValid(false);
            setConfirmationPasswordErrorMessage("Passwords do not match!");
        }
    };

    const alertDismissHandler = () => {
        setAlertStyle(styles.dismiss);
    };

    const registerHandler = e => {
        e.preventDefault();
        validationHandler();

        if (allIsValid) {
            setAlertStyle(styles.alert);
            const signUpData = {
                username,
                email,
                firstName,
                lastName,
                password
            };
            props.register(signUpData, props.history)  // history need for redirecting after success registration
        }
    };

    useEffect(() => {
        // skip validation on first render
        if (firstRender.current) {
            firstRender.current = false;
            return
        }
        validationHandler();
    }, [username, email, firstName, lastName, password, confirmationPassword]);

    return (
        <div className={styles.Auth}>
            <form className={styles.SignUp__form}>
                <h3 className={styles.heading}>Create account</h3>
                {/* alert with back-end errors */}
                {
                    props.error ? <div className={alertStyle}>
                        {props.error_message}
                        <a onClick={alertDismissHandler}>&times;</a>
                    </div> : null
                }

                {/* username input start */}
                <Input
                    id="username"
                    label="Username"
                    type="text"
                    isValid={usernameIsValid}
                    firstRender={firstRender}
                    onChange={e => setUsername(e.target.value)}
                    errorMessage={usernameErrorMessage}
                />
                {/* username input end */}

                {/* email input start */}
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    isValid={emailIsValid}
                    firstRender={firstRender}
                    onChange={e => setEmail(e.target.value)}
                    errorMessage={emailErrorMessage}
                />
                {/* email input end */}

                {/* first name input start */}
                <Input
                    id="first_name"
                    label="First name"
                    type="text"
                    isValid={firstNameIsValid}
                    firstRender={firstRender}
                    onChange={e => setFirstName(e.target.value)}
                    errorMessage={firstNameErrorMessage}
                />
                {/* first name input end */}

                {/* last name input start */}
                <Input
                    id="last_name"
                    label="Last name"
                    type="text"
                    isValid={lastNameIsValid}
                    firstRender={firstRender}
                    onChange={e => setLastName(e.target.value)}
                    errorMessage={lastNameErrorMessage}
                />
                {/* last name input end */}

                {/* password input start */}
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    firstRender={firstRender}
                    onChange={e => setPassword(e.target.value)}
                    errorMessage={passwordErrorMessage}
                />
                {/* password input end */}

                {/* confirmation password input start */}
                <Input
                    id="confirm_password"
                    label="Confirm Password"
                    type="password"
                    isValid={confirmationPasswordIsValid}
                    firstRender={firstRender}
                    onChange={e => setConfirmationPassword(e.target.value)}
                    errorMessage={confirmationPasswordErrorMessage}
                />
                {/* confirmation password input end */}

                <button
                    onClick={e => registerHandler(e)}
                    className={!props.isRequesting ? styles.btn : styles.btn__disabled}
                    disabled={props.isRequesting}
                >
                    {props.isRequesting ? "Wait" : "Sign Up"}
                </button>
                <p className={styles.text}>Already registered? <Link to={"/auth"}>Sign In</Link></p>
            </form>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        isRequesting: state.auth.isRequesting,
        error: state.auth.register_error,
        error_message: state.auth.register_error_message,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (signUpData, history) => dispatch(Register(signUpData, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
