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
  console.log("ExpenseList : ", expensesList);

  expensesList = expensesList.filter(
    (expense) =>
      new Date(expense.amountDate).getFullYear().toString() === filteredYear
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
            key={expenses.expenseId}
            title={expenses.title}
            day={new Date(expenses.amountDate).toLocaleString("en-US", {
              day: "2-digit",
            })}
            month={new Date(expenses.amountDate).toLocaleString("en-US", {
              month: "short",
            })}
            year={new Date(expenses.amountDate).getFullYear()}
            id={expenses.expenseId}
            date={expenses.amountDate}
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
