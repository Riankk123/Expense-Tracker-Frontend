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
        expenseId: action.payload.id,
        title: action.payload.title,
        amount: action.payload.amount,
        amountDate: action.payload.date,
        // day: action.payload.day,
        // month: action.payload.month,
        // year: action.payload.year,
      };
      state.expenses = [newExpense, ...state.expenses];
      state.changed = true;
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.expenseId !== action.payload.id
      );
      state.changed = true;
    },
    updateExpense(state, action) {
      for (let i = 0; i < state.expenses.length; i++) {
        if (state.expenses[i].expenseId === action.payload.id) {
          state.expenses[i].title = action.payload.title;
          state.expenses[i].amount = action.payload.amount;
          state.expenses[i].amountDate = action.payload.date;
          break;
        }
      }
      state.changed = true;
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
