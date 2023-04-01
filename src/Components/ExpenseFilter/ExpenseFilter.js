import "./ExpenseFilter.css";
const ExpenseFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.changeYear(event.target.value);
  };
  return (
    <div className="container-filter">
      <label className="tcolor">Select Year </label>
      <select
        className="fcolor"
        value={props.selectedYear}
        onChange={dropdownChangeHandler}
      >
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>
    </div>
  );
};
export default ExpenseFilter;
