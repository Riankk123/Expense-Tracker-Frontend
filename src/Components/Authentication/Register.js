import { useNavigate } from "react-router-dom";
import "./Authentication.css";

import useAuthInput from "./hooks/use-auth-input";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: enteredNameChangeHandler,
    inputBlurHandler: enteredNameBlurHandler,
    reset: resetEnteredName,
  } = useAuthInput(isNotEmpty);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: enteredPasswordChangeHandler,
    inputBlurHandler: enteredPasswordBlurHandler,
    reset: resetEnteredPassword,
  } = useAuthInput(isNotEmpty);

  const {
    value: enteredAge,
    isValid: enteredAgeIsValid,
    hasError: enteredAgeHasError,
    valueChangeHandler: enteredAgeChangeHandler,
    inputBlurHandler: enteredAgeBlurHandler,
    reset: resetEnteredAge,
  } = useAuthInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: enteredEmailChangeHandler,
    inputBlurHandler: enteredEmailBlurHandler,
    reset: resetEnteredEmail,
  } = useAuthInput(isEmail);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredPasswordIsValid &&
    enteredAgeIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const successfulRegister = () => {
    console.log("Successfuly Registered");
    toast.success("Successfully Registered");
  };

  const errorRegister = (message) => {
    console.log("Error in registering");
    toast.error(message);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      toast.error("Please fill in all the details correctly");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/person/addPerson",

        {
          method: "POST",
          body: JSON.stringify({
            name: enteredName,
            emailId: enteredEmail,
            password: enteredPassword,
            age: enteredAge,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      resetEnteredAge();
      resetEnteredEmail();
      resetEnteredName();
      resetEnteredPassword();
      navigate("/login", {
        replace: true,
      });
      successfulRegister();
    } catch (error) {
      console.log(error.message);
      errorRegister(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser} className="form">
        <div className="reg">
          <input
            type="name"
            value={enteredName}
            onChange={enteredNameChangeHandler}
            onBlur={enteredNameBlurHandler}
            placeholder="Name"
          />
          {enteredNameHasError && (
            <p className="error-text">Please enter a name.</p>
          )}
          <input
            type="age"
            value={enteredAge}
            onChange={enteredAgeChangeHandler}
            onBlur={enteredAgeBlurHandler}
            placeholder="Age"
          />
          {enteredAgeHasError && (
            <p className="error-text">Please enter a valid age.</p>
          )}
          <input
            type="email"
            value={enteredEmail}
            onChange={enteredEmailChangeHandler}
            onBlur={enteredEmailBlurHandler}
            placeholder="Email"
          />
          {enteredEmailHasError && (
            <p className="error-text">Please enter a valid email.</p>
          )}
          <input
            type="password"
            value={enteredPassword}
            onChange={enteredPasswordChangeHandler}
            onBlur={enteredPasswordBlurHandler}
            placeholder="Password"
          />
          {enteredPasswordHasError && (
            <p className="error-text">Please enter a valid Password.</p>
          )}
          <button className="centre" type="submit">
            Register
          </button>
          <p className="login">
            Already a user?
            <a
              onClick={() => {
                navigate("/login", {
                  replace: true,
                });
              }}
            >
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
