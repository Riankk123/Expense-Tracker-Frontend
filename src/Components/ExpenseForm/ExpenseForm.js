import { useState } from "react";
import { useDispatch } from "react-redux";
import "./ExpenseForm.css";
import { expenseAction } from "../../Store/expenses";

const ExpenseForm = (props) => {
  const [enteredTitle, setTitle] = useState("");
  const [enteredAmount, setAmount] = useState("");
  const [enteredDate, setDate] = useState("");
  const dispatch = useDispatch();
  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      expenseAction.addExpense({
        id: Math.random().toString(),
        title: enteredTitle,
        amount: enteredAmount,
        month: new Date(enteredDate).toLocaleString("en-US", {
          month: "short",
        }),
        day: new Date(enteredDate).toLocaleString("en-US", { day: "2-digit" }),
        year: new Date(enteredDate).getFullYear(),
      })
    );
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
    // <form className="form-container" onSubmit={submitHandler}>
    //   <div>
    //     <label>Title</label>
    //     <input
    //       type="text"
    //       value={enteredTitle}
    //       onChange={titleChangeHandler}
    //     />
    //   </div>
    //   <div>
    //     <label>Amount</label>
    //     <input
    //       type="number"
    //       value={enteredAmount}
    //       min="0.01"
    //       step="0.01"
    //       onChange={amountChangeHandler}
    //     />
    //   </div>
    //   <div>
    //     <label>Date</label>
    //     <input type="date" value={enteredDate} onChange={dateChangeHandler} />
    //   </div>
    //   <div className="button-flex">
    //     <button
    //       className="button-item failure-button"
    //       onClick={changeEditState}
    //     >
    //       Cancel
    //     </button>
    //     <button type="submit" className="button-item success-button">
    //       Submit
    //     </button>
    //   </div>
    // </form>
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
