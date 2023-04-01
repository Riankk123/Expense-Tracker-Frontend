import "./ExpenseUnit.css";
import ExpenseDate from "./ExpenseDate";
import ExpenseTitleAmount from "./ExpenseTitleAmount";
import Icons from "../Icons/Icons";
const ExpenseUnit = (props) => {
  return (
    <div className="expense-unit">
      <ExpenseDate day={props.day} month={props.month} year={props.year} />
      <ExpenseTitleAmount amount={props.amount} title={props.title} />
      <Icons id={props.id} />
    </div>
  );
};
export default ExpenseUnit;
