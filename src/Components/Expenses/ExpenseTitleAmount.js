import "./ExpenseTitleAmount.css";
const ExpenseTitleAmount = (props) => {
  return (
    <div className="container">
      <h1 className="fonts">{props.title}</h1>
      <h2 className="fonts">${props.amount}</h2>
    </div>
  );
};
export default ExpenseTitleAmount;
