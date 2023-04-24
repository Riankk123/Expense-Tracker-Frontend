import { useState, useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import "./ExpenseForm.css";
import { expenseAction } from "../../Store/expenses";
import AuthContext from "../../Store/auth-context";
import useInput from "./hooks/use-input";
const isNotEmpty = (value) => value.trim() !== "";
const ExpenseForm = (props) => {
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: enteredTitleHasError,
    valueChangeHandler: enteredTitleChangeHandler,
    inputBlurHandler: enteredTitleBlurHandler,
    reset: resetEnteredTitle,
  } = useInput(isNotEmpty);

  const {
    value: enteredAmount,
    isValid: enteredAmountIsValid,
    hasError: enteredAmountHasError,
    valueChangeHandler: enteredAmountChangeHandler,
    inputBlurHandler: enteredAmountBlurHandler,
    reset: resetEnteredAmount,
  } = useInput(isNotEmpty);

  const [enteredDate, setDate] = useState("");
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const personId = authCtx.personId;
  const token = authCtx.token;
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  let formIsValid = false;

  if (enteredTitleIsValid && enteredAmountIsValid) {
    formIsValid = true;
  }

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
    if (!formIsValid) {
      return;
    }
    const newExpense = {
      title: enteredTitle,
      amountDate: enteredDate,
      amount: enteredAmount,
    };
    addExpense(newExpense);
    resetEnteredAmount();
    resetEnteredTitle();
    setDate("");
  };
  const changeEditState = (event) => {
    event.preventDefault();
    resetEnteredAmount();
    setDate("");
    resetEnteredTitle();
  };

  return (
    <form action="" className="form-expense">
      <div className="show-page-expense">
        <input
          className="input-class"
          type="text"
          value={enteredTitle}
          onChange={enteredTitleChangeHandler}
          onBlur={enteredTitleBlurHandler}
          placeholder="Title"
        />
        {enteredTitleHasError && (
          <p className="error-text">Please enter a title.</p>
        )}
        <input
          className="input-class"
          type="number"
          value={enteredAmount}
          onChange={enteredAmountChangeHandler}
          onBlur={enteredAmountBlurHandler}
          placeholder="Amount"
        />
        {enteredAmountHasError && (
          <p className="error-text">Please enter an amount.</p>
        )}
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
