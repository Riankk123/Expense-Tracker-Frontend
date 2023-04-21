import { useState, useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import "./ExpenseForm.css";
import { expenseAction } from "../../Store/expenses";
import AuthContext from "../../Store/auth-context";

const ExpenseForm = (props) => {
  const [enteredTitle, setTitle] = useState("");
  const [enteredAmount, setAmount] = useState("");
  const [enteredDate, setDate] = useState("");
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const personId = authCtx.personId;
  const token = authCtx.token;
  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const addExpense = useCallback(
    async (newExpense) => {
      const response = await fetch(
        "http://localhost:8080/expenses/addExpense/" + personId,
        {
          crossDomain: true,
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      dispatch(
        expenseAction.addExpense({
          id: data.expenseId,
          title: data.title,
          amount: data.amount,
          date: data.amountDate,
          // month: new Date(data.amountDate).toLocaleString("en-US", {
          //   month: "short",
          // }),
          // day: new Date(data.amountDate).toLocaleString("en-US", {
          //   day: "2-digit",
          // }),
          // year: new Date(data.amountDate).getFullYear(),
        })
      );
    },
    [personId, token, dispatch]
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const newExpense = {
      title: enteredTitle,
      amountDate: enteredDate,
      amount: enteredAmount,
    };
    addExpense(newExpense);
    setAmount("");
    setDate("");
    setTitle("");
  };
  const changeEditState = (event) => {
    event.preventDefault();
    setAmount("");
    setDate("");
    setTitle("");
  };

  return (
    <form action="" className="form-expense">
      <div className="show-page-expense">
        <input
          className="input-class"
          type="text"
          value={enteredTitle}
          onChange={titleChangeHandler}
          placeholder="Title"
        />
        <input
          className="input-class"
          type="number"
          value={enteredAmount}
          onChange={amountChangeHandler}
          placeholder="Amount"
        />
        <input
          className="input-class"
          type="date"
          value={enteredDate}
          onChange={dateChangeHandler}
          placeholder="Date"
        />
        <div className="button-flex-expense">
          <button onClick={submitHandler}>Submit</button>
          <button onClick={changeEditState}>Reset</button>
        </div>
      </div>
    </form>
  );
};
export default ExpenseForm;
