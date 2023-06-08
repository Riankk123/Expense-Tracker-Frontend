import ExpenseList from "../Expenses/ExpenseList";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useContext } from "react";
import { expenseAction } from "../../Store/expenses";
import "./ExpensesAndForm.css";
import AuthContext from "../../Store/auth-context";

const ExpensesAndForm = (props) => {
  const expenses = useSelector((state) => state.expense.expenses);
  const isChanged = useSelector((state) => state.expense.changed);
  const authCtx = useContext(AuthContext);
  const personId = authCtx.personId;
  const token = authCtx.token;
  const dispatch = useDispatch();

  const getExpense = useCallback(async () => {
    const response = await fetch(
      "http://localhost:8080/expenses/getExpenses/" +
        personId,
      {
        crossDomain: true,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) throw new Error("Could Not Fetch Data");

    const data = await response.json();
    console.log(data);

    dispatch(
      expenseAction.replaceExpense({
        expenses: data,
      })
    );

    return data;
  }, [personId, dispatch, token]);

  useEffect(() => {
    async function fetchExpense() {
      try {
        const data = await getExpense();
      } catch {
        console.log("Unable To Fetch Data!!!");
      }
    }
    fetchExpense();
  }, [dispatch, getExpense]);

  return (
    <div className="head">
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};
export default ExpensesAndForm;
