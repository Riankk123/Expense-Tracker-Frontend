import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState();
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const registerUser = async () => {
    try {
      // const user = await createUserWithEmailAndPassword(
      //   auth,
      //   enteredEmail,
      //   enteredPassword
      // );
      setEnteredEmail("");
      setEnteredPassword("");
      navigate("home");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form action="" className="form">
      <div className="reg">
        <input
          type="name"
          value={enteredName}
          onChange={nameChangeHandler}
          placeholder="Name"
        />
        <input
          type="age"
          value={enteredAge}
          onChange={ageChangeHandler}
          placeholder="Age"
        />
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
        <div
          onClick={() => {
            navigate("login");
          }}
          className="alternate_div"
        >
          Login
        </div>
      </div>
    </form>
  );
};
export default RegisterForm;
