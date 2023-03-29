import ExpenseUnit from "./ExpenseUnit";
import "./ExpenseList.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import ChartContainer from "../Chart/ChartContainer";
const ExpenseList = (props) => {
  const [filteredYear, setFilteredYear] = useState("2023");
  const changeFilteredYear = (value) => {
    setFilteredYear(value);
  };
  var expensesList = useSelector((state) => state.expense.expenses);
  expensesList = expensesList.filter(
    (expense) => expense.year.toString() === filteredYear
  );
  return (
    <div className="container">
      <ExpenseFilter
        selectedYear={filteredYear}
        changeYear={changeFilteredYear}
      />
      {expensesList.length > 0 && <ChartContainer expenses={expensesList} />}
      {expensesList.length > 0 &&
        expensesList.map((expenses) => (
          <ExpenseUnit
            amount={expenses.amount}
            key={expenses.id}
            title={expenses.title}
            day={expenses.day}
            month={expenses.month}
            year={expenses.year}
            id={expenses.id}
          />
        ))}
      {expensesList.length === 0 && (
        <div>
          <h1 className="no-expense">No Expenses Available ! </h1>
        </div>
      )}
    </div>
  );
};
export default ExpenseList;
