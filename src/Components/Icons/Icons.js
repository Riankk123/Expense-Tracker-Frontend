import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import "./Icons.css";
import { expenseAction } from "../../Store/expenses";
import { useCallback, useContext } from "react";
import AuthContext from "../../Store/auth-context";
const Icons = (props) => {
  const id = props.id;
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const deleteExpenseBackend = useCallback(
    async (id) => {
      const response = await fetch(
        "http://localhost:8080/expenses/deleteExpense/" + id,
        {
          crossDomain: true,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    [token]
  );
  const removeExpense = () => {
    try {
      deleteExpenseBackend(id);
    } catch {
      console.log("Error in Deleting");
    }
    dispatch(expenseAction.deleteExpense({ id: id }));
  };
  return (
    <div>
      <AiFillEdit className="icon" size={32} />
      <AiTwotoneDelete onClick={removeExpense} className="icon" size={32} />
    </div>
  );
};
export default Icons;
