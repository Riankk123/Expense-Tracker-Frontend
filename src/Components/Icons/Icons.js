import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import "./Icons.css";
import { expenseAction } from "../../Store/expenses";
import { useCallback, useContext, useState } from "react";
import AuthContext from "../../Store/auth-context";
import Modal from "../UI/Modal";
import UpdateForm from "./UpdateForm";

const Icons = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const id = props.id;
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const deleteExpenseBackend = useCallback(
    async (id) => {
      const response = await fetch(
        "https://unknown-umbrella-production.up.railway.app/expenses/deleteExpense/" +
          id,
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
      {isUpdating && (
        <Modal onClose={() => setIsUpdating(false)}>
          <UpdateForm
            onCancel={() => setIsUpdating(false)}
            title={props.title}
            amount={props.amount}
            date={props.date}
            id={id}
          />
        </Modal>
      )}
      <AiFillEdit
        className="icon"
        size={32}
        onClick={() => setIsUpdating(true)}
      />
      <AiTwotoneDelete onClick={removeExpense} className="icon" size={32} />
    </div>
  );
};
export default Icons;
