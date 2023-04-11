import { useContext, useEffect, useState } from "react";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
import "./Authentication.css";

// import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
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

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        body: JSON.stringify({
          emailId: enteredEmail,
          password: enteredPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('You provided an incorrect email or password');
      }

      const data = await response.json();
      const expirationTime = new Date(new Date().getTime() + data.expiresIn);
      authCtx.login(response.headers.get('Authorization').slice(7), expirationTime.toISOString(), data.personId);

      setEnteredEmail("");
      setEnteredPassword("");
      navigate(`/home/${data.personId}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={loginUser} className="form">
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
        <button className='centre' type="submit">Login</button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="alternate_div"
        >
          Register
        </button>
      </div>
    </form>
  );
};
export default LoginForm;
