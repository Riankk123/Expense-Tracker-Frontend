import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { expenseAction } from "./Store/expenses";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Authentication/Login";
import { Routes, Route } from "react-router-dom";
import ExpensesAndForm from './Components/ExpensesAndForm/ExpensesAndForm';
const App = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const isChanged = useSelector((state) => state.expense.changed);
  const dispatch = useDispatch();
  const getExpense = useCallback(async () => {
    // const response = await fetch(
    //   "https://fir-97734-default-rtdb.firebaseio.com/expenses.json"
    // );
    // if (!response.ok) throw new Error("Could Not Fetch Data");
    // const data = await response.json();
    const data = [];
    return data;
  }, []);
  const addExpense = useCallback(async () => {
    // const response = await fetch(
    //   "https://fir-97734-default-rtdb.firebaseio.com/expenses.json",
    //   {
    //     crossDomain: true,
    //     method: "PUT",
    //     body: JSON.stringify(expenses),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const data = await response.json();
    const data = [];
    console.log("Adding Data", data);
  }, [expenses]);
  
  useEffect(() => {
    console.log("Adding Data", isChanged);
    if (isChanged === false) return;
    addExpense();
  }, [addExpense, expenses, isChanged]);
  
  useEffect(() => {
    async function fetchExpense() {
      try {
        const data = await getExpense();
        console.log("Fetching data!!");
        dispatch(expenseAction.replaceExpense({ expenses: data || [] }));
      } catch {
        console.log("Unable To Fetch Data!!!");
      }
    }
    fetchExpense();
  }, [dispatch, getExpense]);
  return (
    <div className="App">
      <h1>Expensio</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ExpensesAndForm />} />
      </Routes>
    </div>
  );
};

export default App;
