import "./ExpenseUnit.css";
import ExpenseDate from "./ExpenseDate";
import ExpenseTitleAmount from "./ExpenseTitleAmount";
import Icons from "../Icons/Icons";
const ExpenseUnit = (props) => {
  return (
    <div className="expense-unit">
      <ExpenseDate day={props.day} month={props.month} year={props.year} />
      <ExpenseTitleAmount amount={props.amount} title={props.title} />
      <Icons id={props.id} amount={props.amount} title={props.title} date={props.date} />
    </div>
  );
};
export default ExpenseUnit;
