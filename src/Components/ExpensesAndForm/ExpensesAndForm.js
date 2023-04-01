import ExpenseList from "../Expenses/ExpenseList";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import "./ExpensesAndForm.css";
import { useState } from "react";
const ExpensesAndForm = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const editingToTrue = () => {
    setIsEditing(true);
  };
  const editingToFalse = () => {
    setIsEditing(false);
  };
  return (
    <div className="head">
      {isEditing && <ExpenseForm changeEditingState={editingToFalse} />}
      {!isEditing && (
        <button className="button-88" onClick={editingToTrue}>
          Add New Expense
        </button>
      )}

      <ExpenseList />
    </div>
  );
};
export default ExpensesAndForm;
