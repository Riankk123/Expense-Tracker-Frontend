import { createSlice } from "@reduxjs/toolkit";
const DUMMY_LIST = {
  expenses: [],
  changed: false,
};
const expenseSlice = createSlice({
  name: "expense",
  initialState: DUMMY_LIST,
  reducers: {
    replaceExpense(state, action) {
      state.expenses = action.payload.expenses;
    },
    addExpense(state, action) {
      const newExpense = {
        id: action.payload.id,
        title: action.payload.title,
        amount: action.payload.amount,
        day: action.payload.day,
        month: action.payload.month,
        year: action.payload.year,
      };
      state.expenses = [newExpense, ...state.expenses];
      state.changed = true;
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      state.changed = true;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
