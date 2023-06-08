import { useContext } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import useAuthInput from "./hooks/use-auth-input";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: enteredEmailChangeHandler,
    inputBlurHandler: enteredEmailBlurHandler,
    reset: resetEnteredEmail,
  } = useAuthInput(isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: enteredPasswordChangeHandler,
    inputBlurHandler: enteredPasswordBlurHandler,
    reset: resetEnteredPassword,
  } = useAuthInput(isNotEmpty);

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const successfulLogin = () => {
    toast.success("Successfully Logged In. ");
  };

  const errorLogin = (message) => {
    toast.error(message);
  };

  const loginUser = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      toast.error("Please fill in all the details correctly");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/authenticate",
        {
          method: "POST",
          body: JSON.stringify({
            emailId: enteredEmail,
            password: enteredPassword,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("You provided an incorrect email or password");
      }

      const data = await response.json();
      const expirationTime = new Date(new Date().getTime() + data.expiresIn);
      authCtx.login(
        response.headers.get("Authorization").slice(7),
        expirationTime.toISOString(),
        data.personId
      );

      resetEnteredEmail();
      resetEnteredPassword();
      console.log("Successfully logged in");
      successfulLogin();
      navigate(`/home/${data.personId}`, {
        replace: true,
      });
    } catch (error) {
      console.log(error.message);
      errorLogin(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={loginUser} className="form">
        <div className="login show-page">
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
            Login
          </button>
          <p className="register">
            Not have an account? 
            <a
              onClick={() => {
                navigate("/", {
                  replace: true,
                });
              }}
            >
              Create Account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
