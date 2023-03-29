import "./Navbar.css";
import { auth } from "../Authentication/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const logoutFunction = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <nav className="primary-nav">
      <h1>Expenseo</h1>
      <button onClick={logoutFunction}>Logout</button>
    </nav>
  );
};
export default Navbar;
