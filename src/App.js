import "./App.css";
import { AiOutlinePoweroff } from "react-icons/ai";

import AuthContext from "./Store/auth-context";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ExpensesAndForm from "./Components/ExpensesAndForm/ExpensesAndForm";
import LoginForm from "./Components/Authentication/Login";
import RegisterForm from "./Components/Authentication/Register";
import { useContext } from "react";

const App = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <div className="App">
      <h1>Expensio</h1>
      {authCtx.isLoggedIn && (
        <AiOutlinePoweroff
          onClick={logoutHandler}
          className="icon-logout"
          size={32}
        />
      )}
      <Routes>
        {!authCtx.isLoggedIn && <Route path="/" element={<RegisterForm />} />}
        {authCtx.isLoggedIn && (
          <Route
            path="/"
            element={<Navigate to={`/home/${authCtx.personId}`} replace />}
          />
        )}
        {!authCtx.isLoggedIn && <Route path="/login" element={<LoginForm />} />}
        {authCtx.isLoggedIn && (
          <Route
            path="/login"
            element={<Navigate to={`/home/${authCtx.personId}`} replace />}
          />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path={`/home/${authCtx.personId}`}
            element={<ExpensesAndForm />}
          />
        )}
        {!authCtx.isLoggedIn && (
          <Route
            path={`/home/${authCtx.personId}`}
            element={<Navigate to="/login" replace />}
          />
        )}
        {!authCtx.isLoggedIn && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path="*"
            element={<Navigate to={`/home/${authCtx.personId}`} replace />}
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
