import { useEffect, useState } from "react";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
import "./Login.css";

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

  const [user, setUser] = useState({});
  useEffect(() => {
    // onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    // });
  }, []);

  console.log("hi user", user);
  const registerUser = async () => {
    try {
      // const user = await createUserWithEmailAndPassword(
      //   auth,
      //   enteredEmail,
      //   enteredPassword
      // );
      setEnteredEmail("");
      setEnteredPassword("");
      console.log(user);
      navigate("home");
    } catch (error) {
      console.log(error.message);
    }
  };
  const loginUser = async () => {
    try {
      // const user = await signInWithEmailAndPassword(
      //   auth,
      //   enteredEmail,
      //   enteredPassword
      // );
      console.log(user);
      setEnteredEmail("");
      setEnteredPassword("");
      navigate("home");
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
      <div className="action">
        <span className="load show" id="login-action" onclick="openLoginPage()">
          Login
        </span>
        <span className="load" onclick="openRegPage()" id="reg-action">
          Register
        </span>
      </div>
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
        <a href="#" onclick="openRegPage()">
          Register
        </a>
      </div>
      <div className="reg">
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
        <button onClick={registerUser}>Register</button>
        <a href="#" onclick="openLoginPage()">
          Login
        </a>
      </div>
    </form>
  );
};
export default LoginForm;
