import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

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

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/person/addPerson", {
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
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setEnteredEmail("");
      setEnteredPassword("");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={registerUser} className="form">
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
        <button className="centre" type="submit">
          Register
        </button>
        <button
          onClick={() => {
            navigate("login");
          }}
          className="alternate_div"
        >
          Login
        </button>
      </div>
    </form>
  );
};
export default RegisterForm;
