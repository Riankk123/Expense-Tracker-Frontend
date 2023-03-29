import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  const month = props.month;
  const day = props.day;
  const year = props.year;
  return (
    <div className="expense-date">
      <h2>{day}</h2>
      <h2>{month}</h2>
      <h3>{year}</h3>
    </div>
  );
};
export default ExpenseDate;
