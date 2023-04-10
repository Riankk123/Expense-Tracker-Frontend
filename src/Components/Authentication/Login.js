import { useEffect, useState } from "react";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
import "./Authentication.css";

// import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  useEffect(() => {
    // onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });
  }, []);

  const loginUser = async () => {
    try {
      // const user = await signInWithEmailAndPassword(
      //   auth,
      //   enteredEmail,
      //   enteredPassword
      // );

      setEnteredEmail("");
      setEnteredPassword("");
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    // <div className="form-container">
    //   <div className="fields">
    //     <label>Email</label>
    //     <input
    //       type="email"
    //       value={enteredEmail}
    //       onChange={emailChangeHandler}
    //     />
    //   </div>
    //   <div className="fields">
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       value={enteredPassword}
    //       onChange={passwordChangeHandler}
    //     />
    //   </div>
    //   <div className="button-flex fields">
    //     <button className="button-item success-button" onClick={registerUser}>
    //       Register
    //     </button>
    //     <button className="button-item success-button" onClick={loginUser}>
    //       Login
    //     </button>
    //   </div>
    // </div>
    <form action="" className="form">
      <div className="login show-page">
        <input
          type="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          placeholder="Email"
        />
        <input
          type="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          placeholder="Password"
        />
        <button onClick={loginUser}>Login</button>
        <div
          onClick={() => {
            navigate("/");
          }}
          className="alternate_div"
        >
          Register
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
