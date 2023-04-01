import ExpenseList from "../Expenses/ExpenseList";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import "./ExpensesAndForm.css";
const ExpensesAndForm = (props) => {
  
  return (
    <div className="head">
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};
export default ExpensesAndForm;
