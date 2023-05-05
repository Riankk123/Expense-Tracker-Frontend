import { useContext, useRef, useState } from "react";
import classes from "./UpdateForm.module.css";
import AuthContext from "../../Store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../Store/expenses";

const isEmpty = (value) => value.trim() === "";
const inPast = (value) =>
  new Date(value).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0);

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const UpdateForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    titleVal: true,
    amountVal: true,
    dateVal: true,
  });

  const authCtx = useContext(AuthContext);
  const [title, setTitle] = useState(props.title);
  const [amount, setAmount] = useState(props.amount);
  const [date, setDate] = useState(formatDate(props.date));
  const token = authCtx.token;
  const dispatch = useDispatch();

  const updateHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = title;
    const enteredAmount = amount;
    const enteredDate = date;

    const enteredTitleIsValid = !isEmpty(enteredTitle);
    const enteredAmountIsValid = !isEmpty(enteredAmount);
    const enteredDateIsValid = !isEmpty(enteredDate) && inPast(enteredDate);

    setFormInputsValidity({
      titleVal: enteredTitleIsValid,
      amountVal: enteredAmountIsValid,
      dateVal: enteredDateIsValid,
    });

    const formIsValid =
      enteredTitleIsValid && enteredAmountIsValid && enteredDateIsValid;

    if (!formIsValid) {
      return;
    }

    const response = await fetch(
      `https://unknown-umbrella-production.up.railway.app
       /expenses/updateExpense/${props.id}`,

      {
        method: "PUT",
        body: JSON.stringify({
          title,
          amount,
          amountDate: date,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update");
    }

    const data = await response.json();

    dispatch(
      expenseAction.updateExpense({
        id: data.expenseId,
        title: data.title,
        amount: data.amount,
        date: data.amountDate,
      })
    );

    props.onCancel();
  };

  const titleControlClasses = `${classes.control} ${
    formInputsValidity.titleVal ? "" : classes.invalid
  }`;
  const amountControlClasses = `${classes.control} ${
    formInputsValidity.amountVal ? "" : classes.invalid
  }`;
  const dateControlClasses = `${classes.control} ${
    formInputsValidity.dateVal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={updateHandler}>
      <div className={titleControlClasses}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        {!formInputsValidity.titleVal && <p>Please enter a valid title!</p>}
      </div>
      <div className={amountControlClasses}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
        />
        {!formInputsValidity.amountVal && (
          <p className={classes.adjust}>Please enter a valid amount!</p>
        )}
      </div>
      <div className={dateControlClasses}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
        {!formInputsValidity.dateVal && <p>Please enter a valid date!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Update</button>
      </div>
    </form>
  );
};

export default UpdateForm;
